import { generateSvg } from "../functions/generateSvg";
import { DynamicProOption } from "../typings/types";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { cropImage } from "cropify";

const DynamicPro = async (option: DynamicProOption) => {
  if (!option.name)
    option.name = "Not Found";
  if (!option.author)
    option.author = "NyuBot";
    option.backgroundColor = "#070707";
  if (!option.nameColor)
    option.nameColor = "#FF7A00";
  if (!option.authorColor)
    option.authorColor = "#FFFFFF";
  if (!option.imageDarkness)
    option.imageDarkness = 10;
  if (!option.duration)
    option.duration = "Not Found";
  if (!option.requested)
    option.requested = "Nyu";

    const noImageSvg = generateSvg(`<svg width="837" height="837" viewBox="0 0 837 837" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="837" height="837" fill="${option.progressColor}"/>
    <path d="M419.324 635.912C406.035 635.912 394.658 631.18 385.195 621.717C375.732 612.254 371 600.878 371 587.589C371 574.3 375.732 562.923 385.195 553.46C394.658 543.997 406.035 539.265 419.324 539.265C432.613 539.265 443.989 543.997 453.452 553.46C462.915 562.923 467.647 574.3 467.647 587.589C467.647 600.878 462.915 612.254 453.452 621.717C443.989 631.18 432.613 635.912 419.324 635.912ZM371 490.941V201H467.647V490.941H371Z" fill="${option.backgroundColor}"/>
    </svg>`)

    if (!option.thumbnailImage) {
        option.thumbnailImage = noImageSvg
    };

  let thumbnail;
  let userIcon;
  let plataformIcon;
    
  try {
    thumbnail = await loadImage3(await cropImage3({
      imagePath: option.thumbnailImage,
      borderRadius: 210,
      width: 400,
      height: 400,
      cropCenter: true
    }));
  } catch {
    thumbnail = await loadImage3(await cropImage3({
      imagePath: noImageSvg,
      borderRadius: 210,
      width: 400,
      height: 400,
      cropCenter: true
    }));
  }

  try {
    userIcon = await loadImage(await cropImage({
        imagePath: option.userImage,
        borderRadius: 50,
        width: 100,
        height: 100,
        cropCenter: true
    }))
} catch {
  userIcon = await loadImage(await cropImage({
        imagePath: noImageSvg,
        borderRadius: 50,
        width: 100,
        height: 100,
        cropCenter: true
    }))
}

try {
  plataformIcon = await loadImage(await cropImage({
      imagePath: option.plataform,
      borderRadius: 50,
      width: 150,
      height: 150,
      cropCenter: true
  }))
} catch {
  plataformIcon = await loadImage(await cropImage({
      imagePath: noImageSvg,
      borderRadius: 50,
      width: 150,
      height: 150,
      cropCenter: true
  }))
}

  if (option.name.length > 32) {
    option.name = option.name.slice(0, 32) + "...";
  }
  if (option.author.length > 25) {
    option.author = option.author.slice(0, 25) + "...";
  }
  if (option.duration.length > 7) {
    option.duration = option.duration.slice(0, 7) + "...";
  }

    try {
        const canvas = createCanvas(2367, 520);
        const ctx = canvas.getContext("2d");

        if (!option.backgroundImage) {
            const backgroundSvg = generateSvg(`<svg width="2367" height="520" viewBox="0 0 2367 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 260C0 116.406 116.406 0 260 0H2107C2250.59 0 2367 116.406 2367 260V260C2367 403.594 2250.59 520 2107 520H260C116.406 520 0 403.594 0 260V260Z" fill="${option.backgroundColor}"/>
            </svg>`);

            const background = await loadImage(backgroundSvg);

            ctx.drawImage(background, 0, 0);
        } else {
            try {
                const darknessSvg = generateSvg(`<svg width="2367" height="520" viewBox="0 0 2367 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H2367V520H0V0Z" fill="#070707" fill-opacity="${option.imageDarkness / 100}"/>
                </svg>`)

                const image = await cropImage({
                    imagePath: option.backgroundImage,
                    width: 2367,
                    height: 520,
                    borderRadius: 50,
                    cropCenter: true
                })

                const darkImage = await cropImage({
                    imagePath: darknessSvg,
                    width: 2367,
                    height: 520,
                    borderRadius: 50,
                    cropCenter: true
                })

                ctx.drawImage(await loadImage(image), 0, 0)
                ctx.drawImage(await loadImage(darkImage), 0, 0)
            } catch (error) {
                const backgroundSvg = generateSvg(`<svg width="2367" height="520" viewBox="0 0 2367 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 260C0 116.406 116.406 0 260 0H2107C2250.59 0 2367 116.406 2367 260V260C2367 403.594 2250.59 520 2107 520H260C116.406 520 0 403.594 0 260V260Z" fill="${option.backgroundColor}"/>
                </svg>`);

                const background = await loadImage(backgroundSvg);

                ctx.drawImage(background, 0, 0);
            }
        }

    ctx.drawImage(thumbnail, 69, 61);
    ctx.drawImage(userIcon, 550, 380);
    ctx.drawImage(plataformIcon, 2200, 360);

    ctx.fillStyle = `${option.nameColor}`;
    ctx.font = "100px extrabold";
    ctx.fillText(option.name, 550, 150);

    ctx.fillStyle = `${option.authorColor}`;
    ctx.font = "70px semibold";
    ctx.fillText(option.author, 550, 250);

    ctx.fillStyle = `${option.timeColor}`;
    ctx.font = "70px semibold";
    ctx.fillText(option.duration, 550, 350);

    ctx.fillStyle = `${option.timeColor}`;
    ctx.font = "70px semibold";
    ctx.fillText(option.requested, 690, 450);

        return canvas.toBuffer("image/png");
    } catch (e: any) {
        throw new Error(e.message)
    }
}

export { Dynamic };
