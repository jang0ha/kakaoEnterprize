// gsap 플러그인 전역 등록 ()
gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () { 
  var agent = navigator.userAgent.toLowerCase();// 브라우저 체크
  // var platform = navigator.platform.toLowerCase();
  if(agent.indexOf(navigator.platform.toLowerCase())>0 ){	//모바일로 접속
    console.log('asdf');
  }
  else {
    if (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1 || agent.indexOf("msie") != -1) {
      $('html').addClass('br-ie');
      console.llog
    } else if (agent.indexOf("chrome") != -1) {
      if (agent.indexOf("edge") != -1 || agent.indexOf("edg") != -1) {
        $('html').addClass('br-edge');
      } else {
        $('html').addClass('br-ch');
  
        if (agent.indexOf("windows") != -1 || agent.indexOf("android") != -1 && platform.indexOf("mac") == -1) {
          $('html').addClass('br-win-ch');
        }
      }
    } else if (agent.indexOf("safari") != -1 && !(agent.indexOf("chrome") != -1)) {
      $('html').addClass('br-safari');
    }
  }


});

// var isMobile = false;
// function isMobile(){
//   return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
// }




let html = document.querySelector("html");
let body = document.querySelector("body");


// var Gnb = {
//   gnbEl: document.querySelector('.gnb'),
//   menuButtonEl: document.querySelector('.menu-button'),
//   init: function () {
//     this.click();
//   },
//   click: function () {
//     menuButtonEl.addEventListenr(event)=> {
//   event.stopPropagation();
//   body.classList.toggle('open-menu');
//     }
//   },

// }


var Menu = {
  menuButtonEl : document.querySelector('.menu-button'),
  init: function () {
    this.click();
  },

  click: function () {
   Menu.menuButtonEl.addEventListener('click',  (event) => {
      event.stopPropagation(); // 이벤트 버블링 정지!
     body.classList.toggle("open-menu");
     if (body.classList.contains('open-menu')) {
       stopScroll();
      } else {
      playScroll();
     }
    })
   }
  
}



Menu.init();


// --------------------------------------------------------
// 함수 형태로 형태로 만들기
// --------------------------------------------------------


function playScroll() {
  html.classList.remove("fixed");//html 스크롤
}
function stopScroll() {
  html.classList.add("fixed"); //html 고정
}

function deviceWidth() {
  if (window.innerWidth <= 996) {
    body.classList.remove('pc');
    body.classList.add('mobile');

  } else {
    body.classList.add('pc');
    body.classList.remove('mobile');
    if (body.classList.contains('open-menu')) { 
      body.classList.remove('open-menu');
      playScroll();
    }
   }
}
// body.classList.add('pc');

window.addEventListener("resize", () => {
  deviceWidth()
})

document.addEventListener('DOMContentLoaded', function () {
  deviceWidth();
});

// PC, MOBILE 구별
function deviceCheck() {
  // 디바이스 종류 설정
  var pcDevice = "win16|win32|win64|mac|macintel";

  // 접속한 디바이스 환경
  if ( navigator.platform ) {
      if ( pcDevice.indexOf(navigator.platform.toLowerCase()) < 0 ) {
        console.log('MOBILE');
        body.classList.add("mobile");
        body.classList.remove("pc");
      } else {
        console.log('PC');
        body.classList.add("pc");
        body.classList.remove("mobile");
      }
  }
}
