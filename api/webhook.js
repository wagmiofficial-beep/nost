// api/webhook.js

export default async function handler(req, res) {
  // Frame spec: vNext
  const BASE_URL = "https://nost.vercel.app";
  const IMAGE_URL = `${BASE_URL}/og.png`;

  // Helper: frame awal
  function initialFrame() {
    return {
      version: "vNext",
      image: IMAGE_URL,
      buttons: [
        {
          label: "View options",
          action: "post"
        },
        {
          label: "Open dashboard",
          action: "link",
          target: BASE_URL
        }
      ],
      postUrl: `${BASE_URL}/api/webhook`
    };
  }

  // Helper: frame  (share)
  function shareFrame(fid) {
    //a on-chain.
    const shareText =
      `Just joined the $NOST airdrop by @nostalgiatoken.farcaster.eth! ` +
      `Mint a memory, not a profit.\n\n` +
      `${BASE_URL}`;

    // URL composer Warpcast
    const warpcastComposeUrl =
      "https://warpcast.com/~/compose?text=" + encodeURIComponent(shareText);

    return {
      version: "vNext",
      image: IMAGE_URL,
      buttons: [
        {
          label: "Join NOST Airdrop",
          action: "link",
          target: BASE_URL
        },
        {
          label: "Share on Farcaster",
          action: "link",
          target: warpcastComposeUrl
        }
      ],
      postUrl: `${BASE_URL}/api/webhook`
    };
  }

  // GET → 
  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(initialFrame());
  }

  // POST → 
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      const untrusted = body.untrustedData || {};
      const buttonIndex = untrusted.buttonIndex || 1; // 1-based
      const fid = untrusted.fid; // 

      // 
      if (buttonIndex === 1) {
        const frame = shareFrame(fid);
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json(frame);
      }

      // 
      const frame = initialFrame();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(frame);
    } catch (err) {
      console.error("webhook error", err);
      return res.status(500).json({ error: "frame_webhook_error" });
    }
  }

  // Method lain → 405
  return res.status(405).json({ error: "method_not_allowed" });
}


