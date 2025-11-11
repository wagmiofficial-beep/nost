export default function handler(req, res) {
  res.status(200).json({
    version: "1",
    image: "https://nost.vercel.app/og.png",
    buttons: [
      {
        label: "Join NOST Airdrop",
        action: "link",
        target: "https://nost.vercel.app"
      }
    ],
    postUrl: "https://nost.vercel.app/api/webhook"
  });
}
