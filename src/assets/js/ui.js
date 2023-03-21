// gsap 플러그인 전역 등록 ()
gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  var agent = navigator.userAgent.toLowerCase(); // 브라우저 체크
  // var platform = navigator.platform.toLowerCase();
  if (agent.indexOf(navigator.platform.toLowerCase()) > 0) { //모바일로 접속
    console.log('asdf');
  } else {
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
let header = document.querySelector("header");


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
// var Init = {
//   defaults: function () {
//     this.resize();
//     window.addEventListener("resize", this.resize);
//   },
//   resize: function () {
//     Init.getBrowserSize();
//     Init.drawBreakPoint();

//     Init.breakpoint = window.matchMedia("(min-width:992px)").matches;
//     if (!Init.breakpoint) {
//       html.classList.remove("desktop");
//       html.classList.add("mobile");
//     } else {
//       html.classList.remove("mobile");
//       html.classList.add("desktop");
//     }
//   },
//   getBrowserSize: function () {
//     this.bodyHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
//     this.bodyWidth = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
//   },
//   drawBreakPoint: function () {
//     html.setAttribute("data-width", this.bodyWidth);
//     html.setAttribute("data-height", this.bodyHeight);
//   },
// };

var Gnb = {
  gnbListAnchorEl: document.querySelectorAll(".gnb .has-treeview > a"),
  gnblistEl: document.querySelector('.gnb .dep1>li:not(.has-treeview) > a'),
  // gnbListAnchorElName: document.querySelector
  init: function () {
    // this.focus();
    if (window.matchMedia("(max-width:768px)").matches) { //desktop
      this.click();
    } else {
       this.focus();
    }
  },
  focus: function () {
    Gnb.gnbListAnchorEl.forEach((item) => {
      item.addEventListener("focus", function (e) {
        e.preventDefault();
        Gnb.gnbListAnchorEl.forEach((item) => {
          item.parentNode.classList.remove("is-visible");
        });
        this.parentNode.classList.toggle("is-visible");
      });
    });

    Gnb.gnblistEl.addEventListener("focus", function (e) { 
      Gnb.gnbListAnchorEl.forEach(buttonel => buttonel.parentNode.classList.remove("is-visible"));
    });

    console.log(Gnb.gnblistEl)
  },


  click: function () {
    Gnb.gnbListAnchorEl.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        Gnb.gnbListAnchorEl.forEach((item) => {
          item.parentNode.classList.remove("is-visible");
        });
        this.parentNode.classList.toggle("is-visible");
      });
    })

    Gnb.gnblistEl.addEventListener("click", function (e) { 
      Gnb.gnbListAnchorEl.forEach(buttonel => buttonel.parentNode.classList.remove("is-visible"));
    });

  }

}

var Menu = {
  menuButtonEl: document.querySelector('.menu-button'),
  init: function () {
    this.click();
  },

  click: function () {
    Menu.menuButtonEl.addEventListener('click', (event) => {
      event.stopPropagation(); 
      body.classList.toggle("open-menu");
      if (body.classList.contains('open-menu')) {
        stopScroll();
      } else {
        playScroll();
      }
    })
  }
}


var Select = {
  init: function () {
    this.append();
  },

  append: function () {
    $(".hidden-select").each(function () {
      $(this).hide();
      var $select = $(this);
      var _id = $(this).attr("id");

      console.log(_id);
      var wrapper = document.createElement("div");
      wrapper.setAttribute("class", "custom-select custom-select__" + _id);

      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("class", "custom-select-input");
      input.setAttribute("id", "custom-select__" + _id);
      input.setAttribute("readonly", "readonly");
      input.setAttribute(
        "placeholder",
        $(this)[0].options[$(this)[0].selectedIndex].innerText
      );

      $(this).before(wrapper);
      var $custom = $(".custom-select__" + _id);
      $custom.append(input);
      $custom.append("<div class='custom-options custom-options-" + _id + "' ></div>");
      var $custom_input = $("#custom-select__" + _id);
      var $ops_list = $(".custom-options-" + _id);
      var $ops = $(this)[0].options;
      for (var i = 0; i < $ops.length; i++) {
        $ops_list.append(
          "<div tabindex='0' data-value='" +
          $ops[i].value +
          "'>" +
          $ops[i].innerText +
          "</div>"
        );
      }

      $custom_input.on("focus", function () {
        $custom.toggleClass("active");
      });
      $custom_input.blur(function () {
        $custom.removeClass("active");
      });
      $ops_list.find("div").click(function () {
        $select.val($(this).data("value")).trigger("change");
        $custom_input.val($(this).text());
        $custom.removeClass("active");
      });
    });
  }

}

var Search = {
  searchInputEl: document.querySelector(".search input[type=search]"),
  searchHelperEl: document.querySelector(".search-helper"),
  searchFormEl: document.querySelector('.search'),
  searchDeleteEl: document.querySelector('.clear-button'),
  searchContianerEl: document.querySelector('.search-container'),
  closeBtnEl: document.querySelector(".search-header .history-btn"),
  init: function () {
    this.open();
    this.blur();
    this.filled();
    this.delete();
    this.close();

    window.addEventListener("resize", this.filled);
  },
  open: function () {
    Search.searchInputEl.addEventListener("click", (evnet) => {
      html.classList.add('searching');

      if (html.classList.contains('mobile') && html.classList.contains('searching')) { //mobile
        stopScroll();
      }
    })

  },
  blur: function () {
    Search.searchInputEl.addEventListener("blur", (event) => {
      event.stopPropagation();
      // html.classList.remove('searching');
      if (!html.classList.contains('mobile')) {
        html.classList.remove('searching');
        playScroll()
      }
    })

  },
  filled: function () {
    // 삭제버튼 노출
    Search.searchInputEl.addEventListener("keyup", function (evnet) {
      let searchArea = this.closest(".search-area");
      if (this.value.length > 0) {
        searchArea.classList.add("filled");
      } else {
        searchArea.classList.remove("filled");
      }
    });
    if (html.classList.contains('desktop') && html.classList.contains('searching')) {
      html.classList.remove('searching');
      playScroll()
    }
  },
  delete: function () {
    Search.searchDeleteEl.addEventListener("click", function (event) {
      let searchArea = this.closest(".search-area");
      event.stopPropagation();
      Search.searchInputEl.value = ''; // 인풋값 초기화
      searchArea.classList.remove('filled');
      // html.classList.remove('searching');
    })
  },
  close: function () {
    Search.closeBtnEl.addEventListener("click", function (event) {
      event.stopPropagation();
      if (html.classList.contains('mobile') && html.classList.contains('searching')) { //mobile
        html.classList.remove('searching');
        playScroll()
        return;
      } else {

      }
    });
  }
}

var Category = {
  categoryContainerEl: document.querySelector('.category-sort-container'),
  moreButtonEl: document.querySelector('.category-toggle-button'),
  subCategoryWrapEl: document.querySelector('.category-sub-list'),
  init: function () {
    this.toggle();
    this.sticky();
  },
  toggle: function () {
    if (Category.moreButtonEl !== null) {
      Category.moreButtonEl.addEventListener("click", () => {
        Category.moreButtonEl.classList.toggle('active');
        if (Category.moreButtonEl.classList.contains("active")) {
          Category.subCategoryWrapEl.classList.add("opend-category");
        } else {
          Category.subCategoryWrapEl.classList.remove("opend-category");
        }
      })
    }
  },
  sticky: function () {
    let headerHeight = header.offsetHeight;
    let stickyEl = document.querySelector(".category-sort-container");
    let topPos = window.pageYOffset + stickyEl.getBoundingClientRect().top;;
    if (stickyEl !== null && window.innerWidth < 767) {
      const observer = new IntersectionObserver(
        // let observer = new IntersectionObserver(callback, options);
        //콜백 1번째 인수
        ([e]) => e.target.classList.toggle('is-sticked', e.intersectionRatio < 1),

        //intersectionRatio : intersectionRect 영역과 boundingClientRect 영역의 비율 >관찰 대상의 교차한 영역 백분율 (threshold와 같은 값을 가짐) >> 타겟이 뷰포트(root)에 1 안에 있을때

        // 아래 콜백의 옵션
        {
          threshold: [1], //옵저버가 실행되기 위해 타겟의 가시성이 얼마나 필요한지 >> 타겟넓이전체가 다 들어왔을때
          rootMargin: '-80px 0px 0px 0px' 
        }

        
      );
      observer.observe(stickyEl);
    }
  }
}


var Footer = {
  footerEl : document.querySelector(".footer"),
  
  init: function () {
    this.openLayer();
  },
  openLayer: function() {
    let toggleButtonEls = Footer.footerEl.querySelectorAll(".nav-toggle-button");
    toggleButtonEls.forEach(button => { 
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        if (this.classList.contains("opened")) {
          //이미 클릭되서 클래스를 가질경우
          button.classList.remove("opened");
        } else {
          //처음일경우
          toggleButtonEls.forEach(buttonel => buttonel.classList.remove("opened")); //배열로 다시만들어서 처음 제거, 
          button.classList.add("opened"); //그다음 클래스 추가
        }
      })
    })

    window.addEventListener("click", (event) => {
      toggleButtonEls.forEach(button => button.classList.remove("opened"));
    })

  }
}

Gnb.init();
Menu.init();
Select.init();
Search.init();
Category.init();
Footer.init();

// --------------------------------------------------------
// 함수 형태로 형태로 만들기
// --------------------------------------------------------



function playScroll() {
  html.classList.remove("fixed"); //html 스크롤
}

function stopScroll() {
  html.classList.add("fixed"); //html 고정
}

// function hideSearch() {
//   searchInputEl.value = '';// 인풋값 초기화
//   searchArea.classList.remove('filled');
// }

function search() {

}

function deviceWidth() {
  if (window.innerWidth <= 767) {
    html.classList.remove('desktop');
    html.classList.add('mobile');

  } else {
    html.classList.add('desktop');
    html.classList.remove('mobile');
    if (body.classList.contains('open-menu')) {
      body.classList.remove('open-menu');
      playScroll();
    }
  }
}

function CheckValueLengh() {
  let inputs = [...document.querySelectorAll("input[type=search]")];
  if (inputs.value.length > 0) {
    this.nextElementSibling.classList.add("filled");
    return false;
  }

}

window.addEventListener("resize", () => {
  deviceWidth()
  // search()
})

document.addEventListener('DOMContentLoaded', function () {
  deviceWidth();
});
// 화면 전체를 클릭했을 때 메뉴가 사라짐.
window.addEventListener("click", () => {

});



// PC, MOBILE 구별
function deviceCheck() {
  // 디바이스 종류 설정
  var pcDevice = "win16|win32|win64|mac|macintel";

  // 접속한 디바이스 환경
  if (navigator.platform) {
    if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
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
