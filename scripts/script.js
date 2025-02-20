import { webPageURL } from "./global_variables.js";

const anchorTags = document.getElementsByTagName("a");

[...anchorTags].forEach((anchorTag) => {
    anchorTag.href = webPageURL;
})

fetch (`${webPageURL}data.json`)
    .then(rawData => rawData.text())
    .then(transformedData => {
        const parsedData = JSON.parse(transformedData);
        const summaryContent = document.getElementById("summaryContent");

        for (const [i, result] of parsedData.entries()) {
            const summaryDetail = document.createElement("div");
            const summaryLogo = document.createElement("img");
            const summaryDescription = document.createElement("p");
            const summaryRatio = document.createElement("p");
            const summaryRatioConsequent = document.createElement("span");

            summaryDetail.classList.add("summary__details", `summary__details--${i}`);
            summaryLogo.src = result.icon;
            summaryLogo.classList.add("summary__details__logo");
            summaryDescription.innerText = result.category;
            summaryRatio.classList.add("summary__details__ratio");
            summaryRatio.innerText = `${result.score} / `;
            summaryRatioConsequent.classList.add("summary__details__consequent");
            summaryRatioConsequent.innerText = "100";

            summaryRatio.appendChild(summaryRatioConsequent);
            summaryDetail.appendChild(summaryLogo);
            summaryDetail.appendChild(summaryDescription);
            summaryDetail.appendChild(summaryRatio);
            summaryContent.appendChild(summaryDetail);
        }
    });