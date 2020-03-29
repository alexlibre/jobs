$(document).ready(function() {
  hideHeader();

  enableSignIn();

  enableFormSwitch();

  makeFav();

  //   refreshProfileProgress();

  onHover();

  openCatalogItem();

  openCatItem();

  enableCollapse();

  // enableFAQ();

  searchInFaq();

  initSelects();

  dropzone();

  dropzoneDocument();

  enableMenu();

  circleProgressSlider(
    9000,
    ".js-company-slider",
    ".block--vacancies-slider .progress"
  );
  circleProgressSlider(9000, ".js-article-slider", ".js-article-circle");
  circleProgressSlider(9000, ".js-companies-carousel", ".js-companies-circle");

  footerSubscript();

  //   popups();

  hidePortfolioEl();

  showPortfolioEl();

  viewAllSertificates();

  innerPopup();

  addCoverLetter();

  // openEducationForm();

  galleryInit(5000);

  autoComplete();

  validateForm();

  getPosFilterBtn();

  delLetterTemplate();

  // handlingSendingData();

  mobMenu();

  profileCompleteHint();

  // handleEduBlocks();
  // handleJobBlocks();
  handleResumeBlockEdits();

  mobFilter();

  btnMob();

  changeButtonName();

  mobFaq();

  popup();

  jsDel();

  jsCancel();

  //   addSelect();

  submitProfileForms();

  handleVacancyForm();

  handleCardForms();
});

const handleResumeBlockEdits = () => {
  const addCardBtn = $(".js-resume-add-card");
  const viewAllCardsBtn = $(".js-cards-view-all");
  const editCardBtn = $(".js-edit-card");

  $("body").on("click", ".js-edit-card", function(e) {
    var form = $(this)
      .parents(".js-resume-block")
      .find(".js-edit-form");
    var ready = $(this)
      .parents(".js-resume-block")
      .find(".js-resume-ready-block");
    var id = $(this)[0].dataset.id;
    var datas = $(this)
      .parents(".js-get-data")
      .find(".js-data");
    var newForm = form[0].cloneNode(true);

    form[0].parentNode.replaceChild(newForm, form[0]);

    TweenMax.to($(ready), 0.4, {
      y: "100",
      opacity: 0,
      height: 0,
      display: "none"
    });

    TweenMax.fromTo(
      $(newForm),
      0.4,
      {
        opacity: 0,
        display: "none",
        height: 0,
        y: 100
      },
      {
        y: "0",
        height: "auto",
        display: "block",
        opacity: 1,
        visibility: "visible"
      }
    );
    showProfilePreferencesEditModal(id);
  });

  $("body").on("click", ".js-cards-view-all", function(e) {
    var form = $(this)
      .parents(".js-resume-block")
      .find(".js-edit-form");
    var ready = $(this)
      .parents(".js-resume-block")
      .find(".js-resume-ready-block");
    var cards = $(this)
      .parents(".js-resume-block")
      .find(".resume__block-card");

    if ($(this).hasClass("is-opened")) {
      $(this).html("+ View all");
      $(this).removeClass("is-opened");
      TweenMax.to($(cards).splice(2), 0.4, {
        y: -50,
        opacity: 0,
        height: 0,
        display: "none"
      });
    } else {
      $(this).html("- Collapse");
      $(this).addClass("is-opened");
      TweenMax.staggerFromTo(
        $(cards).splice(2),
        0.4,
        {
          y: -50
        },
        {
          y: 0,
          opacity: 1,
          height: "auto",
          display: "block"
        },
        0.1
      );
    }
  });

  $("body").on("click", ".js-resume-add-card", function() {
    var form = $(this)
      .parents(".js-resume-block")
      .find(".js-edit-form");
    var ready = $(this)
      .parents(".js-resume-block")
      .find(".js-resume-ready-block");
    var id = $(this)[0].dataset.id;
    [...form[0].querySelectorAll("select")].forEach(item => {
      if (item.classList.contains("select2-hidden-accessible")) {
        $(item).select2("destroy");
      }
      return item;
    });

    var newForm = form[0].cloneNode(true);
    [...newForm.querySelectorAll(".js-input-data")].forEach(item => {
      item.value = "";
      return item;
    });
    //I added this
    [...newForm.querySelectorAll("select")].forEach(item => {
      initSelects(item);
      return item;
    });
    //finish
    form[0].parentNode.replaceChild(newForm, form[0]);

    TweenMax.to($(ready), 0.4, {
      y: "100",
      opacity: 0,
      height: 0,
      display: "none"
    });

    TweenMax.fromTo(
      $(newForm),
      0.4,
      {
        opacity: 0,
        display: "none",
        height: 0,
        y: 100
      },
      {
        y: "0",
        height: "auto",
        display: "block",
        opacity: 1,
        visibility: "visible"
      }
    );
    showProfilePreferencesModal();
  });

  $("body").on("click", $(".js-del-new-block"), function(e) {
    const self = e.target.closest(".js-del-new-block");
    if (self) {
      const form = $(self)
        .parents(".js-resume-block")
        .find(".js-edit-form");
      const ready = $(self)
        .parents(".js-resume-block")
        .find(".js-resume-ready-block");

      TweenMax.to($(form), 0.4, {
        y: 100,
        opacity: 0,
        height: 0,
        display: "none"
      });

      TweenMax.fromTo(
        $(ready),
        0.4,
        {
          opacity: 0,
          display: "none",
          height: 0
        },
        {
          y: 0,
          height: "auto",
          display: "flex",
          opacity: 1,
          visibility: "visible"
        }
      );
    }
  });
};

function hideHeader() {
  // Hide Header on on scroll down
  let didScroll;
  let lastScrollTop = 0;
  const delta = 5;
  const navbarHeight = $(".header").outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    const st = $(window).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta) {
      return false;
    }

    if (st > lastScrollTop && st > navbarHeight) {
      $("header")
        .removeClass("nav-down")
        .addClass("nav-up");
    } else {
      if (st + $(window).height() < $(document).height()) {
        $("header")
          .removeClass("nav-up")
          .addClass("nav-down");
      }
    }

    lastScrollTop = st;
  }
}

function enableSignIn() {
  let visible;
  const popUp = $(".sign-in__popup");
  const pwdRecovery = $(".sign-in__recover-pwd");
  const resRecovery = $(".sign-in__recover-res");
  const states = [popUp, pwdRecovery, resRecovery];
  let emailTmp = "";

  function hideAll(arr) {
    arr.forEach(item => {
      item.slideUp(300);
    });
  }

  function addEvent(trigger, state) {
    return function() {
      $("body").on("click", trigger, e => {
        hideAll(states);
        state.slideDown(300);
        visible = state;
      });
    };
  }

  function hideEmail(str) {
    let tmp = str
      .split(/(.+)@(.+)\.(.+)/)
      .map(item => item.substring(0, 1) + item.substring(1).replace(/./gi, "*"))
      .slice(0, -1);
    let res;
    if (tmp[1]) {
      res = tmp[1] + "@" + tmp.slice(2).join(".");
      return res;
    }
    return false;
  }

  $("body").on("click", e => {
    if (e.target.closest(".js-sign-in-btn") && !visible) {
      popUp.slideToggle(300);
      $(".header__sign-in").toggleClass("is-active");
      $(".js-burger").removeClass("is-active");
      $(".js-mob-menu").removeClass("is-active");
      $("body").removeClass("is-unscrolled");
      visible = popUp;
    } else if (
      e.target.closest(".sign-in__popup") ||
      e.target.closest(".sign-in__recover-pwd") ||
      e.target.closest(".sign-in__recover-res")
    ) {
      // if (!e.target.closest(".sign-in__popup button[type='submit']"))
      //   return false;
    } else {
      hideAll(states);
      visible = "";
      $(".header__sign-in").removeClass("is-active");
    }
  });

  $("body").on("change", "#recover-email", () => {
    emailTmp = hideEmail($("#recover-email").val());
    document.querySelector(".js-res-email").innerHTML = `${emailTmp}`;
  });

  addEvent(".js-recover-pwd", pwdRecovery)();
  addEvent(".js-back-to-sign-in", popUp)();
  addEvent(".js-send-recovery", resRecovery)();
}

function enableFormSwitch() {
  $("body").on("click", "[data-tab]", function(e) {
    e.preventDefault();
    $(this)
      .addClass("is-active")
      .siblings("[data-tab]")
      .removeClass("is-active");
    $("[data-content=" + $(this).data("tab") + "]")
      .addClass("is-active")
      .siblings("[data-content]")
      .removeClass("is-active");
  });
}

function makeFav() {
  $("body").on("click", ".js-make-fav", function(e) {
    if (!$(this).closest(".js-open-catalog-item.is-active")) return false;
    var favId = $(this).attr("data-fav-id");
    var favUrl = $(this).attr("data-fav-url");
    if (!$(this).hasClass("is-active")) {
      $(this).addClass("is-active");

      $.ajax({
        type: "get",
        url: window.location.origin + "/add-to-" + favUrl + $(this).attr("id"),
        success: function() {
          $('[data-fav-id="' + favId + '"]').addClass("is-active");
        }
      });
    } else {
      $(this).removeClass("is-active");
      $.ajax({
        type: "get",
        url:
          window.location.origin +
          "/remove-from-" +
          favUrl +
          $(this).attr("id"),
        success: function() {
          $('[data-fav-id="' + favId + '"]').removeClass("is-active");
        }
      });
    }
  });
}

var refreshProfileProgress = id => {
  $.ajax({
    type: "get",
    url: window.location.origin + "/refresh-profile-progress/" + id,
    success: function success(data) {
      if (data) {
        updateProgressCircle(data);
      }
    }
  });
};

var updateProgressCircle = obj => {
  var elSvgCircle = $(".prc"),
    elPer = $(".js-percent"),
    value = +obj.value,
    text = obj.text,
    percent = (elSvgCircle.attr("stroke-dasharray") * (100 - value)) / 100;

  elSvgCircle.animate(
    {
      strokeDashoffset: percent + "px"
    },
    1000
  );

  elPer.text(value);

  jQuery({ Counter: 0 }).animate(
    { Counter: elPer.text() },
    {
      duration: 1000,
      easing: "swing",
      step: function() {
        elPer.text(Math.ceil(this.Counter));
      }
    }
  );

  if (value === 100) {
    $(".js-hint").css("display", "none");
  } else {
    $(".js-hint .text").html("Complete" + " " + text);
    $(".js-hint").fadeIn(200);
  }
};

// $(window).load(function() {
//   updateProgressCircle(50);
// });

function animateProgressCircle(animDuration, el) {
  const svg = document.querySelector(el);
  if (svg) {
    const prc = svg.querySelector(".prc");
    const to = 0;
    const from = 125;

    animate({
      duration: animDuration,
      draw: function(progress) {
        prc.style.strokeDashoffset = (to - from) * progress + from;
      }
    });
  }

  function animate({ draw, duration }) {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = timeFraction;
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }
}

function onHover() {
  var body = document.body,
    timer;

  window.addEventListener(
    "scroll",
    function() {
      clearTimeout(timer);
      if (!body.classList.contains("disable-hover")) {
        body.classList.add("disable-hover");
      }

      timer = setTimeout(function() {
        body.classList.remove("disable-hover");
      }, 100);
    },
    false
  );
}

function openCatalogItem() {
  $("body").on("click", ".js-open-catalog-item", function(e) {
    e.stopPropagation();
    // console.log(e);
    const current = $(this).attr("data-id");

    if ($(this).hasClass("is-active")) return false;

    $(".js-open-catalog-item").removeClass("is-active");
    $(".catalog-about").fadeOut();

    $(this).addClass("is-active");
    $(`#${current}`).fadeIn();
    // $(this).toggleClass('is-active').siblings('.js-open-catalog-item').removeClass('is-active');
  });
}

function openCatItem() {
  $("body").on("click", ".js-open-cat-item", function(e) {
    e.stopPropagation();
    // console.log(e);
    const current = $(this).attr("data-id");

    if (
      $(this)
        .parent()
        .hasClass("is-active")
    )
      return false;

    $(".catalog__item").removeClass("is-active");
    $(".catalog-about").fadeOut();

    $(this)
      .parent()
      .addClass("is-active");
    $(`#${current}`).fadeIn();
    // $(this).toggleClass('is-active').siblings('.js-open-catalog-item').removeClass('is-active');
  });
}

function searchInFaq() {
  const faq = $(".faq");
  const search = document.querySelector(".faq__search");
  const submit = document.querySelector(".faq__submit");

  faq.on("input", ".faq__search input", function(e) {
    if ($(this).val()) {
      search.classList.add("input--width--available");
      $(".faq__submit").fadeIn(300);
      // submit.classList.add('is-visible');
    } else {
      search.classList.remove("input--width--available");
      $(".faq__submit").fadeOut(300);
      // submit.classList.remove('is-visible');
    }
  });
}

function enableMenu() {
  $("body").on("click", function(e) {
    if (e.target.closest(".js-main-menu")) {
      alert("I am work");
      $(".employ-cab__block").toggleClass("is-active");
      $("body").addClass("is-unscrolled");
    } else if (e.target.closest(".employ-cab")) {
      return;
    } else {
      $(".employ-cab__block").removeClass("is-active");
      // $("body").removeClass("is-unscrolled");
    }
  });
}

function initSelects(el) {
  $(el ? el : "" + ".js-select").each(function() {
    $(this).select2({
      width: "100%",
      minimumResultsForSearch: -1,
      dropdownCssClass: "form-dropdown"
    });
  });
}

function initSelects2() {
  $(".js-select").each(function() {
    $(this).select2({
      width: "100%",
      minimumResultsForSearch: -1,
      dropdownCssClass: "form-dropdown"
    });
  });
}

const dropzone = () => {
  // let checkEl = document.querySelector('.dZUpload__UI');

  let prevContainer = document.querySelector(".resume__pview");
  const previewTemplate = `
    <div class="resume__preview" id="myDzPreview">
        <div class="resume__preview-img"><img data-dz-thumbnail></div>
        <div class="resume__preview-block"><span class="resume__preview-name" data-dz-name></span>
        <button class="resume__preview-remove" data-dz-remove></button>
        </div>
    </div>
   `;

  // if (checkEl != null) {

  Dropzone.autoDiscover = false;

  $(".js-dropzone").each(function(i, el) {
    var myDropzone = new Dropzone(el, {
      url: "/",
      // autoProcessQueue: true,
      // addRemoveLinks: true,
      // parallelUploads: 10,
      // addRemoveLinks:true,
      uploadMultiple: true,
      previewsContainer: prevContainer,
      previewTemplate: previewTemplate,
      // uploadMultiple: true,
      // queueComplete: false,
      init: function() {
        this.on("complete", function(file) {
          if (
            this.getUploadingFiles().length === 0 &&
            this.getQueuedFiles().length === 0
          ) {
            hidePortfolioEl();
          }
        });
      }
    });
  });
};

const dropzoneDocument = () => {
  const prevContainer = document.querySelector(".documents__preview");
  const el = document.querySelector(".js-dropzone-document");
  const previewTemplate = `
    <div class="d-preview" id="myDzPreview">
        <span class="d-preview__name" data-dz-name></span>
        <button class="d-preview__remove" data-dz-remove></button>
    </div>
   `;

  var mock_file = {
    name: "myfile.png",
    size: 10000
  };

  Dropzone.autoDiscover = false;

  if (el) {
    var myDropzone = new Dropzone(el, {
      url: "/",
      // autoProcessQueue: true,
      // addRemoveLinks: true,
      // parallelUploads: 10,
      // addRemoveLinks:true,
      uploadMultiple: true,
      previewsContainer: prevContainer,
      previewTemplate: previewTemplate,
      // uploadMultiple: true,
      // queueComplete: false,
      init: function() {
        this.on("complete", function(file) {
          if (
            this.getUploadingFiles().length === 0 &&
            this.getQueuedFiles().length === 0
          ) {
            hidePortfolioEl();

            const a = document.createElement("a");
            a.className = "d-preview__download";
            a.setAttribute("href", file.url);
            a.setAttribute("target", "_blank");
            file.previewTemplate.appendChild(a);
          }

          // const a = document.createElement('a');
          // a.setAttribute('href', file.url);
          // a.setAttribute('target', "_blank");
          // a.innerHTML = "Prenos";
          // file.previewTemplate.appendChild(a);
        });

        this.emit("addedfile", mock_file);
        this.emit("complete", mock_file);
      }
    });
  }
};

const hidePortfolioEl = () => {
  const rPreviews = $(".resume__preview");

  rPreviews.each(function(i) {
    if (i > 2) {
      $(this).fadeOut();
    }
  });
};

function enableMenu() {
  $("body").on("click", function(e) {
    if (e.target.closest(".js-main-menu")) {
      $(".employ-cab__block").toggleClass("is-active");
      $(".js-burger").removeClass("is-active");
      $(".js-mob-menu").removeClass("is-active");
      $("body").toggleClass("is-unscrolled");
    } else if (e.target.closest(".employ-cab")) {
      return;
    } else {
      $(".employ-cab__block").removeClass("is-active");
    }
  });
}

const showPortfolioEl = () => {
  $("body").on("click", ".resume__show-all", function(e) {
    e.preventDefault();
    const rPreviews = $(".resume__preview");
    console.log($(this).text());

    if (
      !$(this)
        .text()
        .includes("Close")
    ) {
      $(this).text("- Close all");

      rPreviews.each(function(i) {
        //   alert("I am work");
        if (i > 2) {
          $(this).fadeIn();
        }
      });
    } else {
      $(this).text("+ View all");
      hidePortfolioEl();
    }
  });
};

const viewAllSertificates = () => {
  let sertificates = $(".catalog-about__portfolio-item");

  sertificates.each(function(i) {
    if (i > 1) {
      $(this).fadeOut();
    }
  });

  $(".catalog-about__portfolio-count").text(`(${sertificates.length - 2})`);

  $("body").on("click", ".js-view-all", function(e) {
    e.preventDefault();

    $(this).fadeOut();

    sertificates.each(function(i) {
      if (i > 1) {
        $(this).fadeIn();
      }
    });
  });
};

function companySlider(timing) {
  const track = document.querySelector(".js-company-slider");
  $(".js-company-slider").carousel({
    interval: timing
  });
  animateProgressCircle(timing, ".block--vacancies-slider .progress");
  $(".js-company-slider").on("slide.bs.carousel", function(e) {
    animateProgressCircle(timing, ".block--vacancies-slider .progress");
  });
}

function circleProgressSlider(timing, el, circleEl) {
  const track = document.querySelector(el);
  $(el).carousel({
    interval: timing
  });
  animateProgressCircle(timing, circleEl);
  $(el).on("slide.bs.carousel", function(e) {
    animateProgressCircle(timing, circleEl);
  });
}

function enableCollapse() {
  $("body").on("click", ".js-collapse-btn", function() {
    if ($(this).siblings(".js-collapse")) {
      $(this)
        .toggleClass("is-collapsed")
        .siblings(".js-collapse")
        .slideToggle(300);
    }
  });
}

function footerSubscript() {
  $(".footer__subscription-form").on("click", ".subscription__submit", function(
    e
  ) {
    e.preventDefault();
    const msg =
      "<p class='h4 subscription__message'>Thank you for subscription to our newsmail!<p>";
    let tmp = $(".footer__subscription-form")[0].innerHTML;
    setTimeout(function() {
      $(".footer__subscription-form")[0].innerHTML = tmp;
    }, 3000);
    $(".footer__subscription-form")[0].innerHTML = msg;
  });
}

const innerPopup = () => {
  $("[data-ipopup]").on("click", function(e) {
    // e.stopPropagation();
    // e.preventDefault();

    let name = $(this).attr("data-ipopup");

    if ($(window).width() < 1280) {
      $(".inner-popup")
        .parents(".inner-page__right")
        .fadeOut()
        .addClass("is-active");
      $(".inner-popup").fadeOut();
      $("#" + name)
        .parents(".inner-page__right")
        .fadeIn()
        .addClass("is-active");
      $("#" + name).fadeIn();
    } else {
      $(".inner-popup").fadeOut();
      $("#" + name).fadeIn();
    }
  });

  $(".js-ipopup-close").on("click", function() {
    if ($(window).width() < 1280) {
      $(".inner-popup")
        .parents(".inner-page__right")
        .fadeOut()
        .removeClass("is-active");
      $(".inner-popup").fadeOut();
    } else {
      $(".inner-popup").fadeOut();
    }
  });
};

const addCoverLetter = () => {
  $("body").on("click", ".apply__btn", function(e) {
    e.preventDefault();

    if (!$(this).hasClass("apply__btn--remove")) {
      $(this).addClass("apply__btn--remove");
      $(this).text("Remove cover letter");
      $(".apply__form").slideDown(200);
    } else {
      $(".apply__form").slideUp(200);
      $(this).removeClass("apply__btn--remove");
      $(this).text("+ Add a cover letter");
    }
  });
};

const openEducationForm = () => {
  $(".resume__block-edu-btn").on("click", function() {
    $(".resume__block-edu-row").fadeOut(100);
    $(".resume__block-edu-form .form__content").slideDown(300);
  });
};

const handleEduBlocks = () => {
  $(".js-add-edu-block").on("click", function() {
    let blocks = [...document.querySelectorAll(".js-edu-block")];
    let block = blocks[blocks.length - 1];

    [...block.querySelectorAll("select")].forEach(item => {
      $(item).select2("destroy");
      return item;
    });

    const newBlock = block.cloneNode(true);
    [...newBlock.querySelectorAll("input")].forEach(item => {
      item.value = "";
      return item;
    });

    [...block.querySelectorAll("select")].forEach(item => {
      initSelects(item);
      return item;
    });

    block.parentNode.insertBefore(newBlock, block.nextSibling);
    [...newBlock.querySelectorAll("select")].forEach(item => {
      initSelects(item);
      return item;
    });
  });

  $("body").on("click", ".js-del-edu-block", function() {
    let blocks = [...document.querySelectorAll(".js-edu-block")];
    const block = this.parentNode;

    if (blocks.length > 1) {
      block.parentNode.removeChild(block);
    } else {
      $(".resume__block-edu-form .form__content").fadeOut(300);
      $(".resume__block-edu-row").slideDown(300);
    }
  });
};

var submitProfileForms = function(e) {
  $("body").on("click", ".js-form-submit", function(e) {
    submitProfilePreferencesForm(this);
  });
};

const delForm = el => {
  if (el) {
    // console.log(el);
    const form = $(el)
      .parents(".js-resume-block")
      .find(".js-edit-form");
    const ready = $(el)
      .parents(".js-resume-block")
      .find(".js-resume-ready-block");

    TweenMax.to($(form), 0.4, {
      y: 100,
      opacity: 0,
      height: 0,
      display: "none"
    });

    TweenMax.fromTo(
      $(ready),
      0.4,
      {
        opacity: 0,
        display: "none",
        height: 0
      },
      {
        y: 0,
        height: "auto",
        display: "flex",
        opacity: 1,
        visibility: "visible"
      }
    );
  }
};

const autoComplete = () => {
  const cities = [
    "Saint-Petersburg",
    "Moscow",
    "Roma",
    "Peking",
    "London",
    "Quay",
    "Saint-Petersburg",
    "Moscow",
    "Roma",
    "Peking",
    "London",
    "Quay",
    "Saint-Petersburg",
    "Saint-Petersburg",
    "Saint-Petersburg",
    "Saint-Petersburg",
    "Saint-Petersburg",
    "Saint-Petersburg",
    "Saint-Petersburg",
    "Saint-Petersburg",
    "Saint-Petersburg"
  ];

  $(".js-autocomplete .input__control").each(function() {
    $(this).autocomplete({
      source: cities
    });
  });
};

function galleryInit(timing) {
  const gallery = document.querySelector(".js-gallery");

  if (gallery) {
    const items = gallery.querySelectorAll(".slider__item");
    const qty = items.length;
    $(".js-gallery").carousel({
      interval: timing
    });
    let current = 1;
    $("#slider-current").html(current + " / " + qty);
    $(".js-gallery").on("slide.bs.carousel", function(e) {
      items.forEach((item, idx) => {
        if (item.classList.contains("active")) {
          current = idx + 1;
        }
      });
      $("#slider-current").html(current + " / " + qty);
    });
    $(".slider__prev").click(() => {
      $(".js-gallery").carousel("prev");
    });
    $(".slider__next").click(() => {
      $(".js-gallery").carousel("next");
    });
  }
}

const validateForm = () => {
  if ($(".js-validate").length > 0) {
    // alert('I am validate')
    $(".js-validate").each(function() {
      $(this).validate({
        errorClass: "form__err",
        rules: {
          password: "required",
          email: {
            required: true,
            email: true
          }
        },

        messages: {
          password: "Вводите правильный емаил",
          email: "Вводите правильный пароль"
        },

        submitHandler: function() {
          handlingSendingData();
        },

        invalidHandler: function(form, validator) {
          // console.log(form, validator);

          console.log($(validator.currentForm).find(".form__err"));
          // // alert('i am work')
          // console.log($('.js-form').next())
          //     // $('.input__control').each(function() {
          //     //     $(this).next().css('background', 'red');
          //     // })

          // $(validator.currentForm).find('.input').each(function() {
          //     $(this).css('padding', '0px');
          // });
        }
      });
    });
  }

  return false;
};

const handlingSendingData = () => {
  var formData = $(".js-form").serialize();
  $.ajax({
    url: "/",
    data: formData,
    type: "POST",
    dataType: "json",
    success: function(data) {
      console.log(data);
      if (data.status >= 200 && data.status <= 300) {
        alert("Письмo oтпрaвлeнo!");
      } else {
        alert("Письмo не oтпрaвлeнo!");
      }
    },
    error: function(data) {
      $(".js-err").addClass("is-visible");
      // // alert('Вашие данные не правильно! Вводите правильные данные');
      // alert('Error ' + data.status);
    }
  });
};

const getPosFilterBtn = () => {
  let checkboxValues = JSON.parse(localStorage.getItem("checkboxValues")) || {},
    checks = $(".filters .checkbox__control");
  const data = {};

  checks.each(function(i) {
    $(this).attr("data-checked", i);

    $(this).on("change", function() {
      // const posTop = $(this).parent().offset().top - $(this).parents('.filters').offset().top;

      data.id = $(this).attr("id");

      if ($(this).is(":checked")) {
        $(this).attr("checked", "checked");

        data.value = 1;

        checkboxValues[i] = $(this).prop("checked");

        localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
      } else {
        $(this).removeAttr("checked");

        data.value = 0;

        const delItem = $(this).attr("data-checked");
        delete checkboxValues[delItem];

        localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
      }

      console.log(data)

      $.ajax({
        type: "POST",
        url: "/",
        data: data,
        success: function(data) {
        console.log(data);
        }
      });

      // setTimeout(() => {
      //   $(this)
      //     .parents(".filters")
      //     .submit();
      // }, 300);
    });
  });

  $.each(checkboxValues, function(key, value) {
    $("[data-checked = '" + key + "'").prop("checked", value);
  });
};

const delLetterTemplate = () => {
  $("body").on("click", ".js-del-temp", function() {
    console.log(this);
    $(this)
      .parents(".resume__block")
      .remove();
  });
};

const mobMenu = () => {
  $(".js-burger").on("click", function() {
    // alert(" I am work")
    $(this).toggleClass("is-active");
    $(".js-mob-menu").toggleClass("is-active");
    $("body").toggleClass("is-unscrolled");
  });
};

const profileCompleteHint = () => {
  $(".js-hint").on("click", ".js-hint-close", function() {
    $(".js-hint").fadeOut(200);
  });

  //   $(".profile-complete__progress").on(
  //     "click",
  //     ".profile-complete__circle",
  //     function() {
  //       $(".profile-complete__progress .js-hint").fadeIn(200);
  //     }
  //   );
};

const mobFilter = () => {
  $("body").on("click", ".js-mob-filter", function() {
    const txt = $(this).text();
    // console.log(txt);
    if (txt === "Filters") {
      $(this).text("Show");
      $(this)
        .parent()
        .find(".inner-page__sidebar")
        .addClass("is-showed");
      $("body").addClass("is-unscrolled");
    } else {
      $(this).text("Filters");
      $(this)
        .parent()
        .find(".inner-page__sidebar")
        .removeClass("is-showed");
      $("body").removeClass("is-unscrolled");
    }
  });
};

const mobFaq = () => {
  $("body").on("click", ".js-mob-faq", function() {
    const txt = $(this).text();
    // console.log(txt);
    if (txt === "Menu") {
      $(this).text("Questions");
      $(this)
        .parent()
        .find(".inner-page__sidebar")
        .addClass("is-showed");

      $("body").addClass("is-unscrolled");
    } else {
      $(this).text("Menu");
      $(this)
        .parent()
        .find(".inner-page__sidebar")
        .removeClass("is-showed");
      $("body").removeClass("is-unscrolled");
    }
  });
};

const btnMob = () => {
  $("body").on("click", ".js-btn-mob", function() {
    const txt = $(this).text();
    // console.log(txt);
    if (txt.includes("Menu") > 0) {
      $(this).text("Close");
      $(this)
        .parent()
        .find(".inner-page__sidebar")
        .addClass("is-showed");

      $("body").addClass("is-unscrolled");
    } else {
      $(this).text("Menu");
      $(this)
        .parent()
        .find(".inner-page__sidebar")
        .removeClass("is-showed");
      $("body").removeClass("is-unscrolled");
    }
  });
};

const changeButtonName = () => {
  if ($(window).width() < 768) {
    let text = $(".cat-card__request").text();
    console.log(text);
    if (text.includes("request")) {
      text = "Request";
      $(".cat-card__request").text(text);
    }
  }
};

// const addSelect = () => {
//   $("body").on("click", ".js-add-select", function() {
//     // const itm = $(this)
//     //   .prev()
//     //   .find(".form__select");
//     // console.log(itm);
//     // const cln = itm.clone();
//     // $(cln).select2("destroy");
//     // initSelects(cln);
//     // console.log(cln);
//     // cln[0].insertBefore($(this));
//   });
// };

const popup = () => {
  $("[data-popup]").on("click", function() {
    let name = $(this).attr("data-popup");

    $(".popup").removeClass("popup--opened");

    $("#" + name).addClass("popup--opened");

    $("body").addClass("is-unscrolled");

    return false;
  });

  $(".popup__overlay").on("click", function() {
    $(".popup").removeClass("popup--opened");

    $("body").removeClass("is-unscrolled");
  });
};

const jsDel = () => {
  $(".js-del").on("click", function() {
    $(".popup").removeClass("popup--opened");

    $("body").removeClass("is-unscrolled");
  });
};

const jsCancel = () => {
  $(".js-cancel").on("click", function() {
    $(".popup").removeClass("popup--opened");

    $("body").removeClass("is-unscrolled");
  });
};

function submitProfileSummaryForm() {
  var form = $("#add_edit_profile_summary");
  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: form.serialize(),
    dataType: "json",
    success: function(json) {
      $("#additional_form").html(json.html);
      //$("#success_summary").html("<div class='alert alert-success'>{{__('Summary updated successfully')}}</div>");
    },
    error: function(json) {}
  });
}

const handleVacancyForm = () => {
  $(".js-create-vacancy").on("click", function(e) {
    e.preventDefault();
    const self = $(".js-create-vacancy");

    const form = $(self)
      .parents(".js-catalog")
      .find(".js-catalog-form");
    const ready = $(self)
      .parents(".js-catalog")
      .find(".js-catalog-inner");

    //   console.log(form);
    //   console.log(ready);

    TweenMax.fromTo(
      $(form),
      0.4,
      {
        y: 100
      },
      {
        y: 0,
        opacity: 1,
        height: "auto",
        display: "block",
        visibility: "visible"
      }
    );

    TweenMax.fromTo(
      $(ready),
      0.4,
      {
        opacity: 1,
        display: "block",
        height: 0
      },
      {
        y: 0,
        height: "0",
        display: "none",
        opacity: 0,
        visibility: "hidden"
      }
    );

    $(".js-create-vacancy").css("display", "none");
  });

  $(".js-form-cancel").on("click", function(e) {
    e.preventDefault();
    const self = $(".js-form-cancel");

    const form = $(self)
      .parents(".js-catalog")
      .find(".js-catalog-form");
    const ready = $(self)
      .parents(".js-catalog")
      .find(".js-catalog-inner");

    TweenMax.to($(form), 0.4, {
      y: 0,
      opacity: 0,
      height: 0,
      display: "none",
      visibility: "hidden"
    });

    TweenMax.fromTo(
      $(ready),
      0.4,
      {
        y: 100,
        opacity: 0,
        display: "none",
        height: 0
      },
      {
        y: 0,
        height: "auto",
        display: "block",
        opacity: 1,
        visibility: "visible"
      }
    );

    $(".js-create-vacancy").css("display", "block");
  });
};

const handleCardForms = () => {
  $("body").on("click", ".js-card-edit", function(e) {
    e.stopPropagation();
    e.preventDefault();
    const self = $(this);
    const id = self.attr("data-id");
    const form = $(`#${id}`);
    const ready = $(self).parents(".js-cat-card");

    TweenMax.fromTo(
      $(form),
      0.4,
      {
        y: 100
      },
      {
        y: 0,
        opacity: 1,
        height: "auto",
        display: "block",
        visibility: "visible"
      }
    );

    TweenMax.fromTo(
      $(ready),
      0.4,
      {
        opacity: 1,
        display: "block",
        height: 0
      },
      {
        y: 0,
        height: "0",
        display: "none",
        opacity: 0,
        visibility: "hidden"
      }
    );
  });

  $(".js-cForm-cancel").on("click", function(e) {
    e.preventDefault();
    const self = $(this);

    const form = $(self).parents(".catalog__item-form");

    const ready = $(self)
      .parents(".catalog__item")
      .find(".js-cat-card");

    console.log(form, ready);

    TweenMax.to($(form), 0.4, {
      y: 0,
      opacity: 0,
      height: 0,
      display: "none",
      visibility: "hidden"
    });

    TweenMax.fromTo(
      $(ready),
      0.4,
      {
        y: 100,
        opacity: 0,
        display: "none",
        height: 0
      },
      {
        y: 0,
        height: "auto",
        display: "block",
        opacity: 1,
        visibility: "visible"
      }
    );
  });
};
