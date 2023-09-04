let videoContainer = document.getElementById("lower-content");
const apiKey = "AIzaSyCT0IntmZlZpZsvtcfuaPM9XPwfXmvnA_Q";

function formatViewCount(viewCount) {
  if (viewCount >= 1000000000) {
    return (viewCount / 1000000000).toFixed(1) + "B";
  } else if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + "M";
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(0) + "K";
  } else {
    return viewCount.toString();
  }
}

function formatRelativeTime(timestamp) {
  const postDate = new Date(timestamp);
  const now = new Date();

  const timeDifferenceInSeconds = Math.floor((now - postDate) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} second${
      timeDifferenceInSeconds > 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 2592000) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 31536000) {
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
}

async function fetchChannelData(channelId){
    let url = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=snippet`;
    const fetchData = await fetch(url);
    const channelData = await fetchData.json();
    return channelData.items[0];
}


async function fetchChannelLogo(channelId){
    const data = await fetchChannelData(channelId);
    return data.snippet.thumbnails.high.url;
}

const getVideos = async (search) => {
  let url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics&chart=mostPopular&maxResults=20`;
  const fetchdata = await fetch(url);
  const getdata = await fetchdata.json();
  // console.log(getdata);
  for (let i = 0; i < getdata.items.length; i++) {
    // console.log(getdata.items[i]);
    let videoHtml = `<div class="video-cards">
    <div>
      <img src="${getdata.items[i].snippet.thumbnails.high.url}" alt="${
      getdata.items[i].snippet.title
    }">
    </div>
    <div class="video-card-body">
      <img src="${await fetchChannelLogo(getdata.items[i].snippet.channelId)}" alt="${getdata.items[i].snippet.channelTitle}">
      <div>
        <p class="title">${getdata.items[i].snippet.title}</p>
        <p class="channel-name">${getdata.items[i].snippet.channelTitle}</p>
        <p class="time">${formatViewCount(
          getdata.items[i].statistics.viewCount
        )} Views <span style="font-weight: 800;">·</span> ${formatRelativeTime(
      getdata.items[i].snippet.publishedAt
    )}</p>
      </div>
    </div>
  </div>`;

  videoContainer.insertAdjacentHTML("beforeend",videoHtml);

  }
};
getVideos();
// https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCT0IntmZlZpZsvtcfuaPM9XPwfXmvnA_Q&q=rahul&part=snippet&chart=mostPopular&maxResults=20
