function showDetails(member) {
  const details = document.getElementById("details");
  const detailInfo = document.getElementById("detail-info");

  switch (member) {
    case "john":
      detailInfo.innerText =
        "John Doe is the visionary behind ShoeStyle. With a passion for fashion and a keen business sense, he leads the team to new heights.";
      break;
    case "jane":
      detailInfo.innerText =
        "Jane Smith, our head designer, brings creativity and innovation to every collection. Her designs are inspired by the latest trends.";
      break;
    case "alex":
      detailInfo.innerText =
        "Alex Johnson manages our marketing strategies, ensuring ShoeStyle reaches customers worldwide with impactful campaigns.";
      break;
    default:
      detailInfo.innerText = "";
  }

  details.style.display = "flex";
}

function closeDetails() {
  const details = document.getElementById("details");
  details.style.display = "none";
}
