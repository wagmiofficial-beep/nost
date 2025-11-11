// api/webhook.js

module.exports = (req, res) => {
  const frame = {
    version: "vNext",
    image: "https://nost.vercel.app/og.png",
    buttons: [
      {
        label: "Join NOST Airdrop",
        action: "link",
        target: "https://nost.vercel.app"
      }
    ]
  };

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(frame);
};

