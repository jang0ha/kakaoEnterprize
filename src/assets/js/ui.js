// gsap 플러그인 전역 등록 ()
gsap.registerPlugin(ScrollTrigger);


let html = document.querySelector("html");
let body = document.querySelector("body");
let header = document.querySelector("header");


var Gnb = {
  gnbListAnchorEl: document.querySelectorAll(".gnb .has-treeview > a"),
  gnblistEl: document.querySelector('.gnb .dep1>li:not(.has-treeview) > a'),
  init: function () {
    // window.addEventListener("mousewheel", this.scrolling);
    // window.addEventListener("touchmove", this.scrolling);
    if (window.matchMedia("(max-width:768px)").matches) { //desktop
      this.click();
    } else {
      // this.focus();
    }
  },
  focus: function () {
    // 탭으로 이동시
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
  },


  click: function () {
    Gnb.gnbListAnchorEl.forEach(item => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        if (this.parentNode.classList.contains("is-visible")) {
          //이미 클릭되서 클래스를 가질경우
          item.parentNode.classList.remove("is-visible");
        } else {
          //처음일경우
          Gnb.gnbListAnchorEl.forEach(item => item.parentNode.classList.remove("is-visible")); //배열로 다시만들어서 처음 제거, 
          this.parentNode.classList.add("is-visible"); //그다음 클래스 추가
        }
      })
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
    if (Search.searchInputEl != null) { 
    Search.searchInputEl.addEventListener("click", (evnet) => {
      
        html.classList.add('searching');

        if (html.classList.contains('mobile') && html.classList.contains('searching')) { //mobile
          stopScroll();
        }
      })
    }

  },
  blur: function () {
    if (Search.searchInputEl != null) {
      Search.searchInputEl.addEventListener("blur", (event) => {
        event.stopPropagation();
        // html.classList.remove('searching');
        if (!html.classList.contains('mobile')) {
          html.classList.remove('searching');
          playScroll()
        }
      })
    }

  },
  filled: function () {
    if (Search.searchInputEl != null) {
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
    }
  },
  delete: function () {
    if (Search.searchDeleteEl != null) {
      Search.searchDeleteEl.addEventListener("click", function (event) {
        let searchArea = this.closest(".search-area");
        event.stopPropagation();
        Search.searchInputEl.value = ''; // 인풋값 초기화
        searchArea.classList.remove('filled');
        // html.classList.remove('searching');
      })
    }
  },
  close: function () {
    if (Search.closeBtnEl != null) {
      Search.closeBtnEl.addEventListener("click", function (event) {
        event.stopPropagation();
        if (html.classList.contains('mobile') && html.classList.contains('searching')) { //mobile
          html.classList.remove('searching');
          playScroll()
          return;
          blank
        }
      });
    }
  }
}

var Category = {
  categoryContainerEl: document.querySelector('.category-sort-container'),
  moreButtonEl: document.querySelector('.category-toggle-button'),
  subCategoryWrapEl: document.querySelector('.category-sub-list'),
  init: function () {
    this.toggle();
    // this.sticky();
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
    let stickyEl = document.querySelector(".category-sort-container");
    let titleBlock = document.querySelector(".title-header-wrap");
    if (stickyEl !== null && window.innerWidth < 767) {

      // // options에 따라 인스턴스 생성
      const observer = new IntersectionObserver(
        // let observer = new IntersectionObserver(callback, options);
        //콜백 1번째 인수blank
        ([e]) => e.target.classList.toggle('is-sticked', e.intersectionRatio < 1),

        //intersectionRatio : intersectionRect 영역과 boundingClientRect 영역의 비율 >관찰 대상의 교차한 영역 백분율 (threshold와 같은 값을 가짐) >> 타겟이 뷰포트(root)에 1 안에 있을때

        // 아래 콜백의 옵션
        {
          threshold: [1], //옵저버가 실행되기 위해 타겟의 가시성이 얼마나 필요한지 >> 타겟넓이전체가 다 들어왔을때
          rootMargin: '-10px 0px 0px 0px',
          // root: document.querySelector('category-sort-wrap'),
          // rootMargin: '80px 0px 0px 0px'
        }
      );

      // 타겟 요소 관찰 시작
      observer.observe(stickyEl);
    }
  }
}


var Footer = {
  footerEl: document.querySelector(".footer"),
  toggleButtonEls: document.querySelectorAll(".footer .nav-toggle-button"),
  init: function () {
    this.openLayer();
  },
  openLayer: function () {
    Footer.toggleButtonEls.forEach(button => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        if (this.classList.contains("opened")) {
          //이미 클릭되서 클래스를 가질경우
          button.classList.remove("opened");
        } else {
          //처음일경우
          Footer.toggleButtonEls.forEach(buttonel => buttonel.classList.remove("opened")); //배열로 다시만들어서 처음 제거, 
          button.classList.add("opened"); //그다음 클래스 추가
        }
      })
    })


    window.addEventListener("click", (event) => {
      Footer.toggleButtonEls.forEach(button => button.classList.remove("opened"));
    })

  }
}

Gnb.init();
Menu.init();
Select.init();
Search.init();
Category.init();
Footer.init();
header_scroll();




// --------------------------------------------------------
// 함수 형태로 형태로 만들기
// --------------------------------------------------------


//html 스크롤
function playScroll() {
  html.classList.remove("fixed");
}
//html 고정
function stopScroll() {
  html.classList.add("fixed");
}


// 디바이스 넓이 체크
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


// 헤더 스크롤 이벤트
function header_scroll() {

  var lastScroll = 0,
    moveScroll = 10,
    didScroll = null,
    currentScroll = 0,
    headerBlock = document.querySelector("header"),
    headerHeight = document.querySelector("header").clientHeight,
    windowHeight = window.innerHeight;

  document.addEventListener("scroll", () => {
    didScroll = true; //// 스크롤시에 사용자가 스크롤했다는 것을 알림 
    has_scrolled();

  });


  setInterval(function () {

    if (didScroll && !body.classList.contains('open-menu')) {
      has_scrolled();
      didScroll = false; //didScroll 상태를 재설정
    }

  }, 50);

  function has_scrolled() {

    // currentScroll = window.scrollY ||  document.documentElement.scrollTop;
    currentScroll = window.scrollY;


    console.log(currentScroll);
    // 이전의 스크롤 위치와 비교하기
    const direction = currentScroll > lastScroll ? "Scroll Down" : "Scroll Up";

    // 현재의 스크롤 값을 이전스크롤값으로  저장
    // console.log(direction + "1");

    //이전 / 현재 스크롤 
    // console.log(lastScroll, currentScroll);
    // console.log(windowHeight);

    // Make sure they scroll more than move scroll
    if (Math.abs(lastScroll - currentScroll) <= moveScroll) return;


    if (currentScroll > lastScroll) { // ScrollDown

      if (currentScroll > windowHeight) { // 윈도우높이 보다 클때
        console.log('asdf');
        console.log(lastScroll, currentScroll);
        console.log(windowHeight);
        headerBlock.classList.add('hide-header');
        html.classList.add('header-hide');
      }
    } else { // ScrollUp
      headerBlock.classList.remove('hide-header');
      html.classList.remove('header-hide');
    }

    lastScroll = currentScroll;
  }
}



window.addEventListener("resize", () => {
  deviceWidth()

})

document.addEventListener('DOMContentLoaded', function () {
  deviceWidth();
});
