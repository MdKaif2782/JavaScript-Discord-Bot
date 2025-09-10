const { Canvas, loadImage } = require("skia-canvas");
const { MessageAttachment } = require('discord.js');

const background = "https://wallpaperaccess.com/full/490129.jpg";

const dim = {
    height: 675,
    width: 1200,
    margin: 50
};

const av = {
    size: 256,
    x: 480,
    y: 170
};

const generateImage = async (member) => {
    let username = member.user.username;
    let discrim = member.user.discriminator;
    let avatarURL = member.user.displayAvatarURL({ extension: "png", size: av.size });

    const canvas = new Canvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");

    // background
    const backimg = await loadImage(background);
    ctx.drawImage(backimg, 0, 0, dim.width, dim.height);

    // black box
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin);

    // avatar
    const avimg = await loadImage(avatarURL);
    ctx.save();
    ctx.beginPath();
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avimg, av.x, av.y, av.size, av.size);
    ctx.restore();

    // text
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "50px Roboto";
    ctx.fillText("Welcome", dim.width / 2, dim.margin + 70);

    ctx.font = "60px Roboto";
    ctx.fillText(`${username}`, dim.width / 2, dim.height - dim.margin - 125);

    ctx.font = "40px Roboto";
    ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50);

    // get buffer
    const buffer = await canvas.png; // skia-canvas gives buffer via property

    // build attachment
    return new MessageAttachment(buffer, "welcome.png");
};

module.exports = generateImage;
