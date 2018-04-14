<template>
  <v-app light id="app" class="page grey lighten-4" v-scroll="onScroll" v-resize="onResize">
    <header class="header">
      <v-parallax class="banner" :src="assets.bannerBackground" alt="Flisol 2018 - Lima">
        <v-layout column align-center justify-center class="banner__content">
          <v-layout row wrap class="banner__hash-wrapper">
            <v-flex xs6><h1 class="hashtag text-xs-left"><span>#FLISOL</span>2018</h1></v-flex>
            <v-flex xs6><h1 class="hashtag text-xs-right"><span>#LIMA</span>UPN</h1></v-flex>
          </v-layout>
          <img class="logo" :src="assets.bannerContent" alt="Flisol 2018 - Lima">
        </v-layout>
      </v-parallax>
    </header>
    <v-content id="main" class="main">
      <v-container>
        <v-card id="toolbar-container" :style="{
          height: toolbarHeight + 'px'
        }">
          <v-toolbar id="toolbar" color="white">
            <v-menu close-on-content-click offset-x open-on-hover class="hidden-md-and-up">
              <v-toolbar-title slot="activator">
                <v-toolbar-side-icon></v-toolbar-side-icon>
              </v-toolbar-title>
              <v-list>
                <v-list-tile v-for="(section, sectionId) in content.sections" :key="section.title" @click="makeSectionActive(sectionId);scrollTo(sectionId)">
                  <v-list-tile-title v-text="section.title"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-toolbar-title class="hidden-md-and-up">
              {{ activeSection }}
            </v-toolbar-title>
            <v-toolbar-items class="hidden-sm-and-down" v-for="(section, sectionId) in content.sections" :key="section.title" @click="makeSectionActive(sectionId);scrollTo(sectionId)">
              <v-btn flat>{{ section.title }}</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
              <v-btn color="deep-purple darken-4" dark href="https://www.eventbrite.com.ar/e/flisol-lima-2018-tickets-34803732902?aff=efbevent" target="blank">
                Registro
              </v-btn>
          </v-toolbar>
        </v-card>

        <v-card id="home">
          <v-container fill-height fluid>
            <v-layout class="title gutter" fill-height row wrap >
              <v-flex xs12 sm4 flexbox text-xs-left text-sm-right>
                <h1>
                  ¿Qué es el <strong>FLISoL</strong>?
                </h1>
              </v-flex>
              <v-flex class="description" xs12 sm8>
                <p>
                  El <strong>FLISoL</strong> es el evento de difusión de software libre más grande
                  de latinoamérica, dirigido a todo tipo de público, realizándose
                  desde el año 2005.
                </p>

                <p>
                  En la ciudad de <strong>Lima</strong> el festival sera
                  organizado por la <strong>UPN</strong> por segundo año consecutivo como sede del
                  evento.
                </p>
              </v-flex>
              <v-flex xs12 sm8 offset-sm4 style="margin-top:24px;" text-xs-center text-sm-left>
                <img class="logo" :src="assets.logoFlisol" alt="FLISOL">
                <img class="logo" :src="assets.logoUpn" alt="UPN">
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card id="schedule" height="200">
          Schedule
        </v-card>
        <v-card id="speakers" height="200">
          Speakers
        </v-card>
        <v-card id="faq">

          <v-container fill-height fluid>
            <v-layout class="gutter" fill-height row wrap >
              <v-flex xs12 flexbox text-xs-left text-sm-right>

                <v-expansion-panel>
                  <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
                    <div slot="header">Item</div>
                    <v-card>
                      <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>

              </v-flex>
            </v-layout>
          </v-container>



        </v-card>
        <v-card id="location" height="200">
          Location
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="sass">
*,
*:hover,
*:focus,
*:active {
  outline: none;
}

*::-moz-focus-inner {
  border: 0;
}

.application {
  font-family: 'Raleway', 'Montserrat', 'Roboto', 'Lato', sans-serif
}

html,
body.page-wrapper {
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

.page {
  postion: relative;
}

.parallax {
  height: calc(150vh)!important;
  min-height: 579px;

  .parallax__content {
    height: 100vh!important;
    min-height: 500px;
  }
}

.header {
  z-index:0;
}

.toolbar__title {
  margin: 0;
}

.banner {
  .logo {
    width: 100%;
    max-width: 500px;
  }
  .banner__content {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
  }

  .banner__hash-wrapper {
    width: 100%;
    flex: none;
    margin-bottom: 16px;
    .hashtag {
      width: 100%;
      margin: 0;
      font-size: 1.75em;
      span {
        font-weight: 300;
      }
    }
  }
}

.gutter {
  box-sizing: border-box;
  margin-left: -16px;
  margin-right: -16px;
}

.gutter > * {
   padding-left: 16px;
   padding-right: 16px;
}

.main {
  z-index: 1;
  margin-top: -40vh;

  .card ~ .card {
    margin-top: 32px;
  }

  .container {
    max-width: 750px;

    @media (min-width: 960px) {
      max-width: 850px;
    }
  }
}

#home {
  .logo {
    height: 100px;
    width: auto;
  }

  .title {
    h1 {
      margin-top: 0;
      font-weight: 300;
      font-size: 2em;
      line-height: 1.5;
    }

    strong {
      font-weight: 700;
    }
  }

  .description {
    p {
      font-size: 1.2em;
      line-height: 1.5;
      font-weight: 300;
    }
  }
}
</style>

<script>
import bannerBackground from "./assets/banner-background.svg"
import bannerContent from "./assets/banner-content.svg"
import logoFlisol from "./assets/logo-flisol.png"
import logoUpn from "./assets/logo-upn.png"

export default {
  name: "App",
  data() {
    return {
      assets: {
        bannerBackground: bannerBackground,
        bannerContent: bannerContent,
        logoFlisol: logoFlisol,
        logoUpn: logoUpn
      },
      isToolbarFixed: true,
      toolbarHeight() {
        console.log(document.getElementById("toolbar").clientHeight)
        return document.getElementById("toolbar")
          ? document.getElementById("toolbar").clientHeight
          : ""
      },
      content: {
        sections: {
          home: {
            title: "Inicio",
            isActive: true
          },
          schedule: {
            title: "Agenda",
            isActive: false
          },
          speakers: {
            title: "Ponentes",
            isActive: false
          },
          faq: {
            title: "FAQ",
            isActive: false
          },
          location: {
            title: "Ubicación",
            isActive: false
          }
        }
      }
    }
  },
  computed: {
    activeSection() {
      return this.getActiveSection()
    }
  },
  watch: {},
  methods: {
    makeToolbarFixed() {},
    makeSectionActive(target) {
      Object.values(this.content.sections).forEach(section => {
        section.isActive = false
      })
      this.content.sections[target].isActive = true
    },
    getActiveSection() {
      return Object.values(this.content.sections).filter(section => {
        return section.isActive
      })[0].title
    },
    scrollTo(target) {
      window.scrollIntoView(document.getElementById(target))
    },
    onScroll(e) {
      let toolbarContainerBox = document
        .getElementById("toolbar-container")
        .getBoundingClientRect()
      let toolbar = document.getElementById("toolbar")
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop
      let toolbarTop = Math.abs(
        document.body.getBoundingClientRect().top - toolbarContainerBox.top
      )

      if (scrollTop >= toolbarTop) {
        toolbar.style.zIndex = 1
        toolbar.style.right = toolbarContainerBox.left + "px"
        toolbar.style.left = toolbarContainerBox.left + "px"
        toolbar.style.top = 0
        toolbar.style.width = "auto"
        toolbar.style.position = "fixed"
      } else {
        toolbar.style.position = ""
        toolbar.style.width = ""
        toolbar.style.right = ""
        toolbar.style.left = ""
        toolbar.style.top = ""
        toolbar.style.zIndex = 0
      }

      console.log(toolbarTop, scrollTop)
    },
    onResize(e) {
      this.toolbarHeight = document.getElementById("toolbar")
        ? document.getElementById("toolbar").clientHeight
        : ""
    }
  },
  mounted() {}
}
</script>
