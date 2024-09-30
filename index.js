// go to json-server placeholder website which is an api provider
//to get 100's of data we use json-server placeholder website api for pagination document we use json-server website
const mainsection=document.getElementById("data-list-wrapper");
const paginationWapper=document.getElementById("pagination-wrapper");
let currentPage = 1; // Keep track of the current page intializzing values used in first function call fetchandRenderUsers(currentPage, limit) to display first page with 12 objects of data;

const limit = 12; // Set the limit for number of posts per page
function fetchandRenderUsers(pageNumber,limit){
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageNumber}`).then((res)=>{ // here what ever the result got from fetch is stored in res then from json format as it coming from server converted in to object usimg res.json()
    //    --------------------------------------below button creation is done in this then only because in down second then if we do it is  already converted from json to object format and in that second then we are appending to display before selecting the page through buttons that's y we are creation buttons before appending the data to the container before displaying in the browser to user

        let totalPosts=res.headers.get("X-Total-Count");//this is the key in network tab under inspect which gives the total items or data or objects returning from db
        let totalButtons=Math.ceil(totalPosts/10);
        paginationWapper .innerHTML = null;
     // Create Previous Button
     if (pageNumber > 1) {
        const prevButton = getAsButton("Previous", pageNumber - 1);
        paginationWapper.append(prevButton);
    }

    // Create Pagination Buttons
    for (let i = 1; i <= totalButtons; i++) {
        paginationWapper.append(getAsButton(i, i));
    }

    // Create Next Button
    if (pageNumber < totalButtons) {
        const nextButton = getAsButton("Next", pageNumber + 1);
        paginationWapper.append(nextButton);
    }
    return res.json();


    }).then((data)=>{ //as .then handles success of promise that is result of promise 
        console.log(data)
        mainsection.innerHTML=null;
      let cardList= appendingCardList(data);// as this function it returns an cardList and store in cardList variable or reference here cardList is an div which contains inner divs  they are title and des 
      mainsection.append(cardList);
    }).catch((error)=>{
        console.log(error);
    })
}
fetchandRenderUsers(currentPage, limit); //first function call fetchandRenderUsers(currentPage, limit) to display first page with 12 objects of data;


function appendingCardList(data){
    const cardList=document.createElement("div")
    cardList.classList.add("card-list");
    data.forEach((item)=>{
        let card=getcard(item.id,item.title,item.body,null)// in each item objects we are retriving its id and tile and passing as arguments to getcard function
        cardList.append(card);
    })
function  getcard(userid,fullname,body,imgUrl){
    const card = document.createElement("div")
    card.classList.add("card");
    card.setAttribute("data-id",userid);
    const cardbody=document.createElement("div");
    cardbody.classList.add("card-body");

    cardbody.innerHTML=userid;
    const cardTitle = document.createElement("div")
    cardTitle.classList.add("card-title");
    cardTitle.classList.add("card-item");
    cardTitle.innerHTML=fullname;
    const cardDes = document.createElement("div");
    cardDes.classList.add("card-Des");
    cardDes.classList.add("card-item");
    cardDes.innerHTML=body;
    card.append(cardbody,cardTitle,cardDes)
 return card;
}
return cardList;
}

function getAsButton(textonButton,dataId){
    let btn=document.createElement("button");
    btn.setAttribute("data-id", dataId);
    btn.innerHTML=textonButton;
    btn.addEventListener( "click",function(e){
        const page = e.target.getAttribute("data-id");
        currentPage = Number(page); // Convert in to integer and Update currentPage 
        fetchandRenderUsers(currentPage, limit);
        console.log(page); 
    })
    return btn;
}