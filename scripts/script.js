import { webPageURL } from "./global_variables.js";

const anchorTags = document.getElementsByTagName("a");

[...anchorTags].forEach((anchorTag) => {
    anchorTag.href = webPageURL;
})

fetch (`${webPageURL}data.json`)
    .then(rawData => rawData.text())
    .then(transformedData => {
        const parsedData = JSON.parse(transformedData);
        const parsedDataLength = parsedData.length;
        const summaryContent = document.getElementById("summaryContent");
        const resultCircle = document.getElementById("resultCircle");
        let scoreSum = 0;

        for (const [i, result] of parsedData.entries()) {
            scoreSum += result.score;

            const summaryDetail = document.createElement("div");
            const summaryLogo = document.createElement("img");
            const summaryDescription = document.createElement("p");
            const summaryRatio = document.createElement("p");
            const summaryRatioConsequent = document.createElement("span");

            summaryDetail.classList.add("summary__details", `summary__details--${i}`);
            summaryLogo.src = result.icon;
            summaryLogo.alt = result.iconDescription;
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
        
        const resultCircleAntecedent = document.createElement("p");
        
        resultCircleAntecedent.classList.add("result__circle__antecedent");
        resultCircleAntecedent.innerText = Math.floor(scoreSum / parsedDataLength);

        const resultCircleFirstChild = resultCircle.firstChild;

        resultCircle.insertBefore(resultCircleAntecedent, resultCircleFirstChild);
    });