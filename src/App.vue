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
                <v-list-tile v-for="(section, sectionId) in content.sections" :key="section.title" @click="makeSectionActive(sectionId);$vuetify.goTo('#' + sectionId, {offset: -1.5*toolbarHeight})">
                  <v-list-tile-title v-text="section.title"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-toolbar-title class="hidden-md-and-up">
              {{ activeSection }}
            </v-toolbar-title>
            <v-toolbar-items class="hidden-sm-and-down" v-for="(section, sectionId) in content.sections" :key="section.title" @click="makeSectionActive(sectionId);$vuetify.goTo('#' + sectionId, {offset: -1.5*toolbarHeight})">
              <v-btn flat>{{ section.title }}</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
              <v-btn color="deep-purple darken-4" dark href="https://www.eventbrite.com.ar/e/flisol-lima-2018-tickets-34803732902?aff=efbevent" target="blank">
                Registro
              </v-btn>
          </v-toolbar>
        </v-card>

        <v-card id="home" class="section">
          <v-container fill-height fluid>
            <v-layout class="gutter" fill-height row wrap >
              <v-flex class="title" xs12 sm4 flexbox text-xs-left text-sm-right>
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
        <v-card id="schedule" class="section">
          <v-container>
            Schedule
          </v-container>
        </v-card>
        <v-card id="speakers" class="section">
          <v-container>
            Speakers
          </v-container>
        </v-card>
        <v-card id="faq" class="section">
          <v-container fill-height fluid>
            <v-layout fill-height row wrap>
              <v-flex class="title gutter" xs12 flexbox>
                <h1>Preguntas <strong>Frecuentes</strong></h1>
              </v-flex>
              <v-flex class="description" xs12 flexbox>
                <p>
                  Resuelve tus dudas sobre el evento
                </p>
              </v-flex>
            </v-layout>
          </v-container>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="question-mark" color="cyan lighten-2">fas fa-question-circle</v-icon>
                ¿Hay requisitos de identificación o edad para ingresar al evento?
              </div>
              <v-card>
                <v-card-text>
                  Contar con su documento de identidad. No hay limite de edad en caso de ser menor de edad, debe estar acompañado de un adulto.
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="question-mark" color="cyan lighten-2">fas fa-question-circle</v-icon>
                ¿Qué puedo llevar al evento?
              </div>
              <v-card>
                <v-card-text>
                  Puedes llevar tu computador portatil y asistir a los talles de instalaciones
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="question-mark" color="cyan lighten-2">fas fa-question-circle</v-icon>
                ¿Debo llevar mi entrada impresa al evento?
              </div>
              <v-card>
                <v-card-text>
                  Puedes imprimir tu entrada o contar con el QR en el celular para ser registrado al ingreso.
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="question-mark" color="cyan lighten-2">fas fa-question-circle</v-icon>
                ¿Puedo actualizar mi información de inscripción?
              </div>
              <v-card>
                <v-card-text>
                  Una ves enviada la inscripcion ya no se puede actualizar.
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="question-mark" color="cyan lighten-2">fas fa-question-circle</v-icon>
                ¿Puedo transferir la entrada?
              </div>
              <v-card>
                <v-card-text>
                  Las entradas son personales. Todos pueden registrarse sin restricciones.
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon class="question-mark" color="cyan lighten-2">fas fa-question-circle</v-icon>
                ¿Cómo puedo comunicarme con el organizador si tengo preguntas?
              </div>
              <v-card>
                <v-card-text>
                  <p>
                    <v-icon class="question-mark" style="margin-right: 12px;">account_circle</v-icon>
                    Leyla Marcelo
                  </p>
                  <p>
                    <v-icon class="question-mark" style="margin-right: 12px;">email</v-icon>
                    lcaroline.marcelo@gmail.com
                  </p>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
        <v-card id="location" class="section">
          <v-container fill-height fluid>
            <v-layout class="gutter" fill-height row wrap >
              <v-flex xs12 sm6 flexbox>
                <v-layout class="gutter" fill-height row wrap >
                  <v-flex class="title" xs12 flexbox>
                    <h1>
                      Ven  al <strong>FLISoL</strong>
                    </h1>
                  </v-flex>
                  <v-flex class="description" xs12>
                    <p>
                      Y vive la comunidad del <strong>Software Libre</strong>
                    </p>
                  </v-flex>
                  <v-flex xs12>
                    <v-list two-line subheader>
                      <v-divider></v-divider>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <v-icon color="red lighten-1">place</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Universidad Privada del Norte</v-list-tile-title>
                          <v-list-tile-sub-title>Av. Alfredo Mendiola 6062</v-list-tile-sub-title>
                          <v-list-tile-sub-title>Los Olivos</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <v-icon color="orange lighten-1">event</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Sábado 28 abril de 2018</v-list-tile-title>
                          <v-list-tile-sub-title>09:00 a 18:00</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <v-icon color="cyan lighten-1">email</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Leyla Marcelo</v-list-tile-title>
                          <v-list-tile-sub-title>lcaroline.marcelo@gmail.com</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12  sm6>
                <gmap-map
                  :center="map.center"
                  :zoom="15"
                  :options="map.options"
                  class="map">
                  <gmap-marker
                    :position="{
                      lat: -11.959462,
                      lng: -77.067865
                    }"
                    :options="{
                      title: 'Universidad Privada del Norte'
                    }"
                    :title="SoftButterfly"
                    :clickable="true"
                    :draggable="false">
                  </gmap-marker>
                </gmap-map>
              </v-flex>
            </v-layout>
          </v-container>





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

html,
body.page-wrapper {
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

strong {
  font-weight: 700;
}

.application {
  font-family: 'Raleway', 'Roboto', sans-serif;
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

.card.section {
  .title {
    h1 {
      margin-top: 0;
      font-weight: 300;
      font-size: 1.75em;
      line-height: 1.5;
    }
  }

  .description {
    p {
      font-size: 1.35em;
      line-height: 1.5;
      font-weight: 300;


    }
  }
}

#home {
  .logo {
    height: 100px;
    width: auto;
  }
}

#faq {
  .expansion-panel {
    box-shadow: none;
    border-top: 1px solid rgba(0,0,0,.12);

    .expansion-panel__header {
      position: relative;
      padding: 24px 24px 24px 60px;
      font-weight: 700;
      font-size: 1em;

      .question-mark {
        position: absolute;
        top: 24px;
        left: 24px;
      }
    }

    .expansion-panel__body {
      .card {
        .card__text {
          font-size: 1em;
          padding: 0 24px 24px 60px;
          font-weight: 400;
          p:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

#location {
  .map {
    height: 100%;
    min-height: 300px;
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
      },
      map: {
        center: {
          lat: -11.959462,
          lng: -77.067865
        },
        options: {
          draggable: false,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#000000" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "all",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [{ color: "#fafafa" }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#fafafa" }]
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }]
            },
            {
              featureType: "road",
              elementType: "all",
              stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [{ visibility: "simplified" }]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [{ color: "#4694ec" }, { visibility: "on" }]
            }
          ]
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
