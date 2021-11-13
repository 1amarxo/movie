
//Api Keys
const tmbd_apiKey="8323ca72074935a1a863d15723a5ffad";
const base_tmbd_url="https://api.themoviedb.org/3/movie/550?api_key=";
const tmdb_search_query=`https://api.themoviedb.org/3/search/movie?api_key=${tmbd_apiKey}&query=`;
const IMG_URL="https://image.tmdb.org/t/p/w500/";

//HTML tags which we use in Code
const pagBar=document.getElementById('.pageNumbers');

//Div for Sliders
let new_movies_block=document.querySelector('.new-movie');
let popular_movies_block=document.querySelector('.popular-movie');

//NavBar Buttons
let home_button=document.getElementById('navbar-home-button');
let shows_button=document.getElementById('navbar-shows-button');

//Pagination
let pagination_element=document.createElement("div");
pagination_element.classList.add("pageNumbers");
pagination_element.setAttribute('id','pagination');


//Elements for containerf
let container=document.createElement("div");
container.classList.add("container");

//Elements for content
let content=document.querySelector('.content');
content.appendChild(pagination_element);
content.appendChild(container);


let banner_div=document.querySelector('.banner');

//Elements For New Movies Slider
let glide_new_movies=document.createElement("div");
let glide__track_new_movies=document.createElement("div");
let glide__slides_new_movies=document.createElement("ul");

//Elements For Popular Movies Slider
let glide_popular=document.createElement("div");
let glide__track_popular=document.createElement("div");
let glide__slide_popular=document.createElement("ul");


let imdbId=[];

//Elements for Pagination
let nextPage = 2;
let prevPage = 3;
let totalPages = 100;
let current_page = 1;




//Load Page
document.addEventListener( 'DOMContentLoaded', function() {

    homepage();
} );

$("#navbar-shows-button").click(async function(){
    tv_show();
});
//Home Button On CLick
$("#navbar-home-button").click(function() {
    

    popular_movies_block.style.display='block';
    new_movies_block.style.display='block';
    $('.banner').css("display","none");
    $('.actorPage_banner').css("display","none");
    $('.actorPageTemp_detail').css("display","none");
    $('.detail_cast').css("display","none");
    container.style.display="none";    
    pagination_element.style.display='none';
    
    $(".banner").empty();
    $(".content").remove(".banner");
    $(".actorPage_banner").empty();
    
                
});






//Search Button
document.forms.searchFilm.addEventListener('submit',()=>{
  
    search(document.forms.searchFilm.movieinput.value,1);
    event.preventDefault()
});



//Function Creating Sliders
function glideCreateFunc(){
        glide_new_movies.classList.add("glide");
        glide_new_movies.setAttribute('id',"glide1");

        glide_popular.classList.add("glide");
        glide_popular.setAttribute('id',"glide2");

        glide__track_new_movies.classList.add("glide__track");
        glide__track_new_movies.setAttribute('data-glide-el',"track");


        glide__track_popular.classList.add("glide__track");
        glide__track_popular.setAttribute('data-glide-el',"track");


        glide__slides_new_movies.classList.add("glide__slides");
        glide__slide_popular.classList.add("glide__slides");        
}








//Home Page 
async function homepage(){

    //AJAX requesthttps://api.themoviedb.org/3/movie/popular?api_key=${tmbd_apiKey}
    let url_page='&page=';
    let tmdb_popular_query=`https://api.themoviedb.org/3/movie/popular?api_key=${tmbd_apiKey}`+url_page;
    let tmdb_playingnow_query=`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmbd_apiKey}`+url_page;
    
const texttrev=gsap.timeline();
    texttrev.from(".header", 0.6,{
        y:-200,
        ease:"power4.out",
        
        
        
    });
    texttrev.from(".brand ", 0.5,{
        y:-200,
        ease:"power4.easeinout",
        skewY:10,
        
        
        
    });
    texttrev.from(".menu li", 1,{
        y:-200,
        ease:"power4.out",
        skewY:10,
        stagger:{
            amount:0.4
        },
        
    });
    texttrev.from(".search ", 0.3,{
        y:-100,
        ease:"power4.out",
        skewY:10,
       
        
    });
    
    try{

        let response_popular=await fetch(tmdb_popular_query+current_page);
        let data_popular = await response_popular.json();
        console.log(data_popular);
    
        let response_playing=await fetch(tmdb_playingnow_query+current_page);
        let data_playing = await response_playing.json();
  
        
        glideCreateFunc();
        

        //Loop for Adding 
        for(let i=0;i<19;i++){
            
            let new_slide=document.createElement("li");
            new_slide.classList.add("glide__slide");
    
            let div=document.createElement("div");
            div.classList.add("popular-card");
            
            $(new_slide).click(async function(){
                let render_data =await $.get(`https://api.themoviedb.org/3/movie/${data_popular.results[i].id}?api_key=${tmbd_apiKey}`);
                let actors_response=await $.get(`https://api.themoviedb.org/3/movie/${data_popular.results[i].id}/credits?api_key=${tmbd_apiKey}`);
                let video_response=await $.get(`http://api.themoviedb.org/3/movie/${data_popular.results[i].id}/videos?api_key=${tmbd_apiKey}`)
                console.log(video_response);
                container.style.display='none';
                new_movies_block.style.display='none';
                popular_movies_block.style.display='none';
                pagination_element.style.display='none';
                
                backgroundPosterCompiler(render_data);
                renderDetail(render_data,actors_response,video_response);
                
                $(".banner").css("background-image", `url(${render_data.backdrop_path})`);
                if(render_data.original_title.length>14){
                    $("#detial_title").css('font-size',50);
                }
                if(render_data.original_title.length>20){
                    $("#detial_title").css('font-size',38);
                }
                $(".img_image").attr('src',IMG_URL+render_data.poster_path);
                $("#acter_1").attr('src',IMG_URL+actors_response.cast[0].profile_path);
                $("#acter_2").attr('src',IMG_URL+actors_response.cast[1].profile_path);
                $("#acter_3").attr('src',IMG_URL+actors_response.cast[2].profile_path);
            
                $("#acter_4").attr('src',IMG_URL+actors_response.cast[3].profile_path);
                
       
                
            });
            let img=document.createElement("img");
            img.classList.add("popular-image");
            img.setAttribute("src",IMG_URL+data_popular.results[i].poster_path);

            let popular_details=document.createElement("div");
            popular_details.classList.add("popular-details");

            let popular_title=document.createElement("h4");
            popular_title.classList.add("popular-title");
            popular_title.innerHTML=data_popular.results[i].title;
            
            let popular_raiting=document.createElement("p");
            popular_raiting.classList.add("raiting");

            popular_details.appendChild(popular_title);
            popular_details.appendChild(popular_raiting);
            div.appendChild(img);
            div.appendChild(popular_details);
            new_slide.appendChild(div);
            glide__slide_popular.appendChild(new_slide);
            
            

        }
        
        glide__track_popular.appendChild(glide__slide_popular);
        glide_popular.appendChild(glide__track_popular);
    
        document.querySelector(".popular-movie").appendChild(glide_popular);
        
        
        var mounting = new Glide(document.getElementById('glide2'), {
            type:'carousel',
            perView:6,
            keyboard:false,
            autoplay: 3000,gap:30,
            animationDuration:500,
            breakpoints: {
                1500:{
                    perView:5
                },
            1340:{
            perView:4
                
            },
            1000:{
                perView:3
            },
            800:{
                perView:2
            },
            450:{
                perView:1
            }
        }

          });
          mounting.mount();
          
          
          for(let i=0;i<10;i++){
        
            let new_slide=document.createElement("li");
            new_slide.classList.add("glide__slide");
            $(new_slide).click(async function(){
                let render_data =await $.get(`https://api.themoviedb.org/3/movie/${data_playing.results[i].id}?api_key=${tmbd_apiKey}`);
                let actors_response=await $.get(`https://api.themoviedb.org/3/movie/${data_playing.results[i].id}/credits?api_key=${tmbd_apiKey}`);
                let video_response=await $.get(`http://api.themoviedb.org/3/movie/${data_playing.results[i].id}/videos?api_key=${tmbd_apiKey}`)
                console.log(data_playing.results[i].id);
                container.style.display='none';
                new_movies_block.style.display='none';
                popular_movies_block.style.display='none';
                pagination_element.style.display='none';
                backgroundPosterCompiler(render_data);
                
                renderDetail(render_data,actors_response,video_response);
                
                   
            });
            let div=document.createElement("div");
            div.classList.add("nm-box");

            imdbId[i]=data_playing.results[i].id;

            let img =document.createElement("img");
            img.classList.add("nm-image");
            img.setAttribute('src',IMG_URL+data_playing.results[i].backdrop_path);
            
            div.appendChild(img);
            new_slide.appendChild(div);
            glide__slides_new_movies.appendChild(new_slide);
            console.log(data_playing.results[i]);



            let actors_response=await crewDetails(imdbId[i]);
            
            

            
            let details_new_movie_slider=  document.createElement("div");
            details_new_movie_slider.classList.add("details");
            
            let h2_title_new_movie_slider=document.createElement("h2");
            h2_title_new_movie_slider.innerHTML=data_playing.results[i].title;

            let div_tags_new_movie_slider=document.createElement("div");
            div_tags_new_movie_slider.classList.add("tags");

            let img_new_movie_slider=document.createElement("img");
            img_new_movie_slider.classList.add("nm-image");
            img_new_movie_slider.setAttribute("src","IMG_URL+data_playing.results[i].backdrop_path");

            let div_cast_new_movies_slider=document.createElement("div");
            div_cast_new_movies_slider.classList.add("cast");

            let h4_cast=document.createElement("h4");
            let hr=document.createElement("hr");
            let ul=document.createElement("ul");

            for(let g=0;g<5;g++){
                let li=document.createElement("li");
                let actor_img=document.createElement("img");
                actor_img.setAttribute("src",IMG_URL+actors_response.cast[g].profile_path);
                li.appendChild(actor_img);
                ul.appendChild(li);
            }


            for(let j=0;j<data_playing.results[i].genre_ids.length;j++){

                if(data_playing.results[i].genre_ids[j]==16){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("animation");
                    tags.innerHTML=" Animation";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==12){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("adventure");
                    tags.innerHTML=" Adventure";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==28){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("action");
                    tags.innerHTML=" Action";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==80){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("crime");
                    tags.innerHTML="Crime";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==99){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("documentary");
                    tags.innerHTML="Documentary";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==35){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("comedy");
                    tags.innerHTML=" Comedy";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==18){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("drama");
                    tags.innerHTML=" Drama";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==10751){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("family");
                    tags.innerHTML="Family";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==14){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("fantasy");
                    tags.innerHTML="Fantasy";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==36){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("history");
                    tags.innerHTML="History";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==27){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("horror");
                    tags.innerHTML="Horror";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==10402){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("music");
                    tags.innerHTML="Music";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==9648){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("mystery");
                    tags.innerHTML="Mystery";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==10749){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("romance");
                    tags.innerHTML="Romance";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==878){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("science_fiction");
                    tags.innerHTML="Science Fiction";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==10770){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("tv_movie");
                    tags.innerHTML="TV Movie";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==53){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("thriller");
                    tags.innerHTML="Thriller";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==10752){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("war");
                    tags.innerHTML="War";
                    div_tags_new_movie_slider.appendChild(tags);
                }
                if(data_playing.results[i].genre_ids[j]==37){
                    
                    let tags=document.createElement("span");
                    tags.classList.add("western");
                    tags.innerHTML="Western";
                    div_tags_new_movie_slider.appendChild(tags);
                }
            }   

            div_cast_new_movies_slider.appendChild(h4_cast);
            div_cast_new_movies_slider.appendChild(hr);
            div_cast_new_movies_slider.appendChild(ul);

            details_new_movie_slider.appendChild(h2_title_new_movie_slider);
            details_new_movie_slider.appendChild(div_tags_new_movie_slider);
            details_new_movie_slider.appendChild(div_cast_new_movies_slider);
            div.appendChild(details_new_movie_slider);
            div.appendChild(img_new_movie_slider);
            
            
        
        for(let j=0;j<data_playing.results[i].genre_ids.length;j++){

            if(data_playing.results[i].genre_ids[j]==16){
                
                let tags=document.createElement("div");
                tags.classList.add("animation");
                tags.innerHTML="Animation";
                
            }
        }    
    }
        
        
        glide__track_new_movies.appendChild(glide__slides_new_movies);
        glide_new_movies.appendChild(glide__track_new_movies);
        
        document.querySelector(".new-movie").appendChild(glide_new_movies);
        new Glide(document.getElementById('glide1'), {
            type:'carousel',
            perView:3,
            autoplay: 4000,gap:20,
            animationDuration:1500,
            breakpoints: {
            1340:{
            perView:3
                
            },
            1120:{
                perView:1
            },
            550:{gap:100,
                perView:2
            },
            450:{
                gap:50,
                perView:1
            }
        }

          }).mount();
    }
    
    catch(error){
        console.error(error);
    }
}







//Search Querry
async function search(userSearch,current_page){

    //AJAX request
    let url='http://www.omdbapi.com/?i=tt3896198&apikey=e3be5d1e&s=';
    let url_page='&page=';
    let tmdb_search_query=`https://api.themoviedb.org/3/search/movie?api_key=${tmbd_apiKey}&query=${userSearch}`+url_page;
    lastUrl=url;

    content.style.display='block';
    $(".banner").css("display",'none');
    $(".detail_cast").css("display",'none');
    popular_movies_block.style.display='none';
    new_movies_block.style.display='none';
    container.style.display='grid';
    pagination_element.style.display='flex';
    try{

        let response=await fetch(tmdb_search_query+current_page);
        let data= await response.json();
        console.log(data);
        
        

        SetupPagination(data, pagination_element);
        clearChilds(document.querySelector(".container"));
        
       
        for(let i=0;i<data.results.length;i++){
            
            console.log(IMG_URL+data.results[i].poster_path);
            let card=document.createElement("div");
            
            card.classList.add("card");

            let animation=document.createElement("div");
            animation.classList.add("animation");
            animation.setAttribute('data-aos-delay',50);
            animation.setAttribute('data-aos-duration',1000);
            animation.setAttribute('data-aos','fade-in');
            

            let imageBox=document.createElement("div");
            imageBox.classList.add("card-image-box");

            let img=document.createElement("img");
            img.setAttribute('src',IMG_URL+data.results[i].poster_path);
            img.classList.add("card-image");

            let black_filter=document.createElement("div");
            black_filter.classList.add("black-filter");

            let card_dsc=document.createElement("div");
            card_dsc.classList.add("card-description");

            let ref=document.createElement("a");

            let card_title=document.createElement("p");
            card_title.classList.add("card-title");
            card_title.innerHTML=data.results[i].title;

           
            let topic1=document.createElement("span");
            let topic2=document.createElement("span");
            let topic3=document.createElement("span");
            topic1.classList.add("topic");
            topic2.classList.add("topic");
            topic3.classList.add("topic");



            

            let card_plot=document.createElement("p");
            card_plot.classList.add("card-plot");

            let card_type=document.createElement("p");
            card_type.classList.add("card-type");
            card_type.innerHTML="Rating: ";
            topic1.innerHTML=data.results[i].vote_average;
            
            let card_year=document.createElement("p");
            card_year.classList.add("card-year");
            card_year.innerHTML="Year: ";
            topic3.innerHTML=data.results[i].release_date;

            
            imdbId[i]=data.results[i].id;
            $(card).click(async function(){

                let render_data =await $.get(`https://api.themoviedb.org/3/movie/${data.results[i].id}?api_key=${tmbd_apiKey}`);
                let actors_response=await $.get(`https://api.themoviedb.org/3/movie/${data.results[i].id}/credits?api_key=${tmbd_apiKey}`);
                let video_response=await $.get(`http://api.themoviedb.org/3/movie/${data.results[i].id}/videos?api_key=${tmbd_apiKey}`)
                console.log(video_response);
                

                container.style.display='none';
                new_movies_block.style.display='none';
                popular_movies_block.style.display='none';
                pagination_element.style.display='none';
                backgroundPosterCompiler(render_data);
                
                renderDetail(render_data,actors_response,video_response);
               
                $(".banner").css("background-image", `url(${render_data.backdrop_path})`);
                if(render_data.original_title.length>14){
                    $("#detial_title").css('font-size',50);
                }
                if(render_data.original_title.length>20){
                    $("#detial_title").css('font-size',38);
                }
                $(".img_image").attr('src',IMG_URL+render_data.poster_path); 
            });
            
            
            
            card_type.appendChild(topic1);
            card_year.appendChild(topic3);
            ref.appendChild(card_title);

            card_dsc.appendChild(ref);
            
            card_dsc.appendChild(card_plot);
            card_dsc.appendChild(card_type);
            card_dsc.appendChild(card_year);
          

            animation.appendChild(imageBox);
            imageBox.appendChild(img);
            imageBox.appendChild(black_filter);            
            card.appendChild(animation);
            card.appendChild(card_dsc);  
            container.appendChild(card);
            document.querySelector(".content").appendChild(container);

        }
                    

        console.log(data);
        console.log(imdbId);
        

        
    }
    catch(error){
        console.error(error);
    }
}


async function tv_show(){

    //AJAX request
    let url='http://www.omdbapi.com/?i=tt3896198&apikey=e3be5d1e&s=';
    let url_page='&page=';
    let tmdb_search_query=`https://api.themoviedb.org/3/tv/popular?api_key=${tmbd_apiKey}&language=en-US&page=1`+url_page;
    lastUrl=url;

    content.style.display='block';
    $(".banner").css("display",'none');
    $(".detail_cast").css("display",'none');
    popular_movies_block.style.display='none';
    new_movies_block.style.display='none';
    container.style.display='grid';
    
    try{

        let response=await fetch(tmdb_search_query+current_page);
        let data= await response.json();
        console.log(data);
        
        

        clearChilds(document.querySelector(".container"));
        
       
        for(let i=0;i<data.results.length;i++){
            
            console.log(IMG_URL+data.results[i].poster_path);
            let card=document.createElement("div");
            
            card.classList.add("card");

            let animation=document.createElement("div");
            animation.classList.add("animation");
            animation.setAttribute('data-aos-delay',50);
            animation.setAttribute('data-aos-duration',1000);
            animation.setAttribute('data-aos','fade-in');
            

            let imageBox=document.createElement("div");
            imageBox.classList.add("card-image-box");

            let img=document.createElement("img");
            img.setAttribute('src',IMG_URL+data.results[i].poster_path);
            img.classList.add("card-image");

            let black_filter=document.createElement("div");
            black_filter.classList.add("black-filter");

            let card_dsc=document.createElement("div");
            card_dsc.classList.add("card-description");

            let ref=document.createElement("a");

            let card_title=document.createElement("p");
            card_title.classList.add("card-title");
            card_title.innerHTML=data.results[i].name;

           
            let topic1=document.createElement("span");
            let topic2=document.createElement("span");
            let topic3=document.createElement("span");
            topic1.classList.add("topic");
            topic2.classList.add("topic");
            topic3.classList.add("topic");



            

            let card_plot=document.createElement("p");
            card_plot.classList.add("card-plot");

            let card_type=document.createElement("p");
            card_type.classList.add("card-type");
            card_type.innerHTML="Rating: ";
            topic1.innerHTML=data.results[i].vote_average;
            
            let card_year=document.createElement("p");
            card_year.classList.add("card-year");
            card_year.innerHTML="Year: ";
            topic3.innerHTML=data.results[i].first_air_date;

            
            imdbId[i]=data.results[i].id;
            $(card).click(async function(){

                let render_data =await $.get(`https://api.themoviedb.org/3/tv/${data.results[i].id}?api_key=${tmbd_apiKey}`);
                let actors_response=await $.get(`https://api.themoviedb.org/3/tv/${data.results[i].id}/credits?api_key=${tmbd_apiKey}`);
                let video_response=await $.get(`http://api.themoviedb.org/3/tv/${data.results[i].id}/videos?api_key=${tmbd_apiKey}`)
                console.log(video_response);
                

                container.style.display='none';
                new_movies_block.style.display='none';
                popular_movies_block.style.display='none';
                pagination_element.style.display='none';
                backgroundPosterCompiler(render_data);
                
                renderDetail_TV(render_data,actors_response,video_response);
                
                $(".banner").css("background-image", `url(${render_data.backdrop_path})`);
                if(render_data.original_title.length>14){
                    $("#detial_title").css('font-size',50);
                }
                if(render_data.original_title.length>20){
                    $("#detial_title").css('font-size',38);
                }
                $(".img_image").attr('src',IMG_URL+render_data.poster_path); 
            });
            
            
            
            card_type.appendChild(topic1);
            card_year.appendChild(topic3);
            ref.appendChild(card_title);

            card_dsc.appendChild(ref);
            
            card_dsc.appendChild(card_plot);
            card_dsc.appendChild(card_type);
            card_dsc.appendChild(card_year);
          

            animation.appendChild(imageBox);
            imageBox.appendChild(img);
            imageBox.appendChild(black_filter);            
            card.appendChild(animation);
            card.appendChild(card_dsc);  
            container.appendChild(card);
            document.querySelector(".content").appendChild(container);

        }
                    

        console.log(data);
        console.log(imdbId);
        

        
    }
    catch(error){
        console.error(error);
    }
}








function posterAnimationFunc(){
    const body=$("body")
    cx= window.innerWidth/2;
    cy=window.innerHeight/2;

    body.mousemove(function( event ) {
        clientX=event.pageX
        clientY=event.pageY

        request= requestAnimationFrame(updateMe)
        
    });
    function updateMe(){
        dx=clientX-cx; 
        dy=clientY-cy;
        tiltx=dy/cy;
        tilty=dx/cx;
        radius=Math.sqrt(Math.pow(tiltx,2)+Math.pow(tilty,2))
        degree=radius *11
        gsap.to('.main_content',1,{transform:`rotate3d(${tiltx},${tilty},0,${degree}deg)`})

    }
    
const texttrev=gsap.timeline();
texttrev.from(".main_content", 1,{
    y:-1000,
    ease:"power4.out",
    skewY:10,
    stagger:{
        amount:0.4
    },
    
});
    texttrev.from(".peice p", 1,{
        y:-200,
        ease:"power4.out",
        skewY:10,
        stagger:{
            amount:0.4
        },
        
    });
    texttrev.from(".div_image", 1,{
        x:200,
        ease:"power4.out",
        skewY:25,
        
    });
  
}






 function renderDetail(data,actors,video_response){
    
    let templateDetail=$("#banner_detsildTemp").html();
    let templateCast=$("#castTemp").html();
    let templateVideo=$("#videoTemp").html();

    let templateDetailFunc=Handlebars.compile(templateDetail);
    let templateCastFunc=Handlebars.compile(templateCast);
    let tempalteVideoFunc=Handlebars.compile(templateVideo);

    console.log(video_response);
    let video=tempalteVideoFunc(video_response);
    let cast=templateCastFunc(actors);
    let detail=templateDetailFunc(data);
    
    $(".content").append(detail)
    $(".content").append(cast);
    $(".banner").append(video);
    posterAnimationFunc();
    $(".banner").css("background-image", `url(${data.backdrop_path})`);
    if(data.original_title.length>14){
        $("#detial_title").css('font-size',50);
    }
    if(data.original_title.length>20){
        $("#detial_title").css('font-size',38);
    }
    
    $(".img_image").attr('src',IMG_URL+data.poster_path);
    
    
        const btn=document.querySelector('.play');

        const video_Container=document.querySelector('.video_container');

        const close=document.querySelector('.close');

        btn.addEventListener('click',()=> {
            $(".iframe").attr('src',"https://www.youtube.com/embed/"+video_response.results[0].key);
            video_Container.classList.add('show'); 
            let video=tempalteVideoFunc(video_response);
            $(".banner").append(video);
        })
        close.addEventListener('click',()=> {
            video_Container.classList.remove('show'); 
            
        })
        
    for(let i=0;i<4;i++){
        $(`.acter_${i+1}`).attr('src',IMG_URL+actors.cast[i].profile_path);

        $(`.acter_${i+1}`).click(async function(){
            

            container.style.display='none';
            new_movies_block.style.display='none';
            popular_movies_block.style.display='none';
            pagination_element.style.display='none';
            $('.banner').css("display","none");
    
            $('.detail_cast').css("display","none");

            renderActorPage(actors.cast[i].id);
        });
    }


}


function renderDetail_TV(data,actors,video_response){
    
    let templateDetail=$("#banner_detsildTemp").html();
    let templateCast=$("#castTemp").html();
    let templateVideo=$("#videoTemp").html();
    data.original_title=data.name;
    delete data.name;

    let templateDetailFunc=Handlebars.compile(templateDetail);
    let templateCastFunc=Handlebars.compile(templateCast);
    let tempalteVideoFunc=Handlebars.compile(templateVideo);

    console.log(data);
    let video=tempalteVideoFunc(video_response);
    let cast=templateCastFunc(actors);
    let detail=templateDetailFunc(data);
    
    $(".content").append(detail)
    $(".content").append(cast);
    $(".banner").append(video);
    posterAnimationFunc();
    $(".banner").css("background-image", `url(${data.backdrop_path})`);
   
    if(data.original_title.length>14){
        $("#detial_title").css('font-size',50);
    }
    if(data.original_title.length>20){
        $("#detial_title").css('font-size',38);
    }
    
    $(".img_image").attr('src',IMG_URL+data.poster_path);
    
    
        const btn=document.querySelector('.play');

        const video_Container=document.querySelector('.video_container');

        const close=document.querySelector('.close');

        btn.addEventListener('click',()=> {
            $(".iframe").attr('src',"https://www.youtube.com/embed/"+video_response.results[0].key);
            video_Container.classList.add('show'); 
            let video=tempalteVideoFunc(video_response);
            $(".banner").append(video);
        })
        close.addEventListener('click',()=> {
            video_Container.classList.remove('show'); 
            
        })
        
    for(let i=0;i<4;i++){
        $(`.acter_${i+1}`).attr('src',IMG_URL+actors.cast[i].profile_path);

        $(`.acter_${i+1}`).click(async function(){
            

            container.style.display='none';
            new_movies_block.style.display='none';
            popular_movies_block.style.display='none';
            pagination_element.style.display='none';
            $('.banner').css("display","none");
    
            $('.detail_cast').css("display","none");

            renderActorPage(actors.cast[i].id);
        });
    }


}






async function renderActorPage(actor_id){
    
    let celebrities=await $.get(`https://api.themoviedb.org/3/person/${actor_id}?api_key=${tmbd_apiKey}&language=en-US`);
    let credits=await $.get(`https://api.themoviedb.org/3/person/${actor_id}/movie_credits?api_key=${tmbd_apiKey}`);

    let templateActoFilm=$("#actorPageTemp_Films").html();
    let templateActors=$("#actorPage_Temp").html();
  
    $(celebrities).prop('birthday',getAge(celebrities.birthday));

    console.log(celebrities.birthday);  
    console.log(celebrities);
    console.log(credits);
    let templateDetailFunc=Handlebars.compile(templateActoFilm);
    let templateCastFunc=Handlebars.compile(templateActors);
    
    let cast=templateCastFunc(celebrities);
    let detail=templateDetailFunc(credits);
    
    $(".content").append(cast)
    $(".content").append(detail);
    let more=document.querySelectorAll('.more');
        for(let i=0;i<more.length;i++){
            more[i].addEventListener('click',function(){
                more[i].parentNode.classList.toggle('active');
            });
        }
    $(".img_image").attr('src',IMG_URL+celebrities.profile_path);
    posterAnimationFunc();
}

function getAge(dateString) {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
 }


function backgroundPosterCompiler(data){
    $(data).prop('backdrop_path',IMG_URL+data.backdrop_path);
}




  
function SetupPagination (items, wrapper) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.total_pages);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i);
		wrapper.appendChild(btn);
	}
}



function PaginationButton (page) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		search(document.forms.searchFilm.movieinput.value,current_page);

		let current_btn = document.querySelector('.pageNumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
    clearChilds(document.querySelector(".container"));
	});

	return button;
}



function clearChilds(Node) {
  var child = Node.firstChild;
  while(child) {
      Node.removeChild(child);
      child = Node.firstChild;
  }
}



async function detailButton(id){
    let response =await $.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmbd_apiKey}`);
    
    return response;
}




async function crewDetails(id){
    let actors_response=await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${tmbd_apiKey}`);
    let data =await actors_response.json();
    return data;
}
