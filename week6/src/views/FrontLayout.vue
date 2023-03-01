<script>
  import { RouterLink, RouterView } from 'vue-router';

  export default {
    components: {
      RouterLink,
      RouterView,
    },
  };
</script>

<template>
  <!-- navbar start-->
  <nav class="navbar fixed-top navbar-expand-lg navbar-light" style="background-color: #f0f8ec">
    <div class="container">
      <RouterLink to="/" class="navbar-brand"><img src="../assets/image/logo2.png" width="180" alt="logo" class="d-inline-block align-text-top logo-s" /></RouterLink>
      <div class="d-flex align-items-center">
        <!--手機版 cart & login icon-->
        <div class="d-lg-none">
          <RouterLink to="/order" class="navbar-brand">
            <img src="../assets/image/Property1=cart@2x.png" alt="cart" width="30" height="30" />
          </RouterLink>
          <RouterLink to="/login" class="navbar-brand text-center">
            <img src="../assets/image/Property1=member@2x.png" alt="member" width="30" height="30" />
          </RouterLink>
        </div>
        <!--漢堡按鈕-->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link text-center">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link text-center">線上訂餐</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link text-center" href="#">門市資訊</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-center" href="#">常見問題</a>
          </li> -->
        </ul>
      </div>
      <!--桌機版 cart & login icon-->
      <div class="ps-3 d-none d-lg-block">
        <RouterLink to="/order" class="navbar-brand">
          <img src="../assets/image/Property1=cart@2x.png" alt="cart" width="30" height="30" />
        </RouterLink>
        <RouterLink to="/login" class="navbar-brand text-center">
          <img src="../assets/image/Property1=member@2x.png" alt="member" width="30" height="30" />
        </RouterLink>
      </div>
    </div>
  </nav>
  <!-- navbar end-->
  <RouterView></RouterView>
</template>

<style lang="scss">
  @media (max-width: 992px) {
    .logo-s {
      width: 116px;
    }
  }
  .nav-link {
    border-bottom: 4px solid transparent;
  }
  @media (min-width: 992px) {
    .nav-link.active {
      border-bottom: 4px solid #a8cf45;
    }
  }
  .border-green {
    border-color: #a8cf45 !important;
  }
  .green {
    color: #4f8147;
  }
  .bg-light-green {
    background-color: #f0f8ec;
  }
  .order-banner {
    background-image: url('../assets/image/good-vegan-s.png');
    background-position: center 1200px;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .order-banner-plan {
    margin-top: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    letter-spacing: 16px;
    width: 500px;
    height: 130px;
    background-color: rgba(240, 248, 236, 0.522);
    backdrop-filter: blur(6px);
  }
  .mask {
    width: 193px;
    height: 200px;
    overflow: hidden;
  }
  .mask img {
    transition: all 0.8s ease;
  }
  .mask img:hover {
    transform: scale(1.2, 1.2);
  }
  .img-cover {
    object-fit: cover;
  }
  .line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .nav-tabs {
    --bs-nav-tabs-border-width: 0px;
  }
  .nav-tabs .nav-link:focus {
    border-color: transparent;
  }
  .nav-tabs .nav-link {
    border-bottom: 3px solid transparent;
  }
  .nav-tabs .nav-link:hover {
    border-color: #a8cf45;
    transition: all 0.5s ease;
    opacity: 0.8;
  }
  .nav-tabs .nav-link.active {
    border-bottom: 3px solid #a8cf45;
  }
  .offcanvas.offcanvas-start {
    width: 450px;
  }
  .table {
    --bs-table-border-color: transparent;
  }
  .form-check-input:checked {
    background-color: #4f8147;
    border-color: #4f8147;
  }
</style>
