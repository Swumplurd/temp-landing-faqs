//Script para toast de plataformas y canales en vivo parte superior de la calculadora

var toastPackages = {
      updateVisibility: function () {
          var radioChecked = $("input[name='paquetes']:checked").length > 0;
          var toast = $("#toast-liveStream");

          if (radioChecked) {
              toast.css("display", "block");
          } else {
              toast.css("display", "none");
          }
      },
      close: function () {
          $("#toast-liveStream").css("display", "none");
      },
      init: function () {
          this.updateVisibility();
          $(".btn-close-packages").click(this.close);
          $("input[name='paquetes']").click(this.updateVisibility);
      }
  };

  var toastPlatforms = {
      updateVisibility: function () {
          var checkboxesChecked = $("input[type='checkbox']:checked").length > 0;
          var toast = $("#toast-platforms");

          if (checkboxesChecked) {
              toast.css("display", "block");
          } else {
              toast.css("display", "none");
          }
      },
      close: function () {
          $("#toast-platforms").css("display", "none");
      },
      init: function () {
          this.updateVisibility();
          $(".btn-close-platforms").click(this.close);
          $("input[type='checkbox']").change(this.updateVisibility);
      }
  };

  $(document).ready(function () {
      toastPackages.init();
      toastPlatforms.init();
  });
