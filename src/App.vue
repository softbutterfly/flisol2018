<template>
  <v-app light id="app" class="page grey lighten-4" v-scroll="onScroll">
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
    <v-content ref="main" id="main" class="main">
      <v-container>
        <v-card id="toolbar-container" :style="{height: toolbarHeight + 'px'}">
          <v-toolbar id="toolbar" color="white">
            <v-menu close-on-content-click offset-x class="hidden-md-and-up">
              <v-toolbar-title slot="activator">
                <v-toolbar-side-icon></v-toolbar-side-icon>
              </v-toolbar-title>
              <v-list>
                <template v-for="(section, sectionId) in content.sections">
                  <v-list-tile v-if="section.includeInMeu"  :key="section.title" @click="scrollTo(sectionId)">
                    <v-list-tile-title v-text="section.title"></v-list-tile-title>
                  </v-list-tile>
                </template>
              </v-list>
            </v-menu>
            <v-toolbar-title class="hidden-md-and-up">
              {{ activeSection }}
            </v-toolbar-title>
            <template v-for="(section, sectionId) in content.sections">
              <v-toolbar-items class="hidden-sm-and-down" v-if="section.includeInMeu" :key="section.title" @click="scrollTo(sectionId)">
                <v-btn flat>{{ section.title }}</v-btn>
              </v-toolbar-items>
            </template>
            <v-spacer></v-spacer>
              <v-btn color="deep-purple darken-4" dark href="https://www.eventbrite.com.ar/e/flisol-lima-2018-tickets-34803732902?aff=efbevent" target="blank">
                Registro
              </v-btn>
          </v-toolbar>
        </v-card>

        <v-card ref="home" id="home" class="section">
          <v-container fill-height fluid>
            <v-layout class="gutter" fill-height row wrap >
              <v-flex class="title" xs12 sm4 text-xs-left text-sm-right>
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
                  En la ciudad de <strong>Lima</strong> el festival será
                  organizado por la <strong>UPN</strong> por segundo año consecutivo como sede del
                  evento.
                </p>
              </v-flex>
              <v-flex xs12 sm8 offset-sm4 text-xs-center text-sm-left>
                <img class="logo" :src="assets.logoFlisol" alt="FLISOL">
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <v-card ref="schedule" id="schedule" class="section" dark color="deep-purple darken-4">
          <v-container fill-height fluid>
            <v-layout fill-height row wrap>
              <v-flex class="title gutter" xs12>
                <h1>Nuestra <strong>Agenda</strong></h1>
              </v-flex>
              <v-flex class="description" xs12>
                <p>
                  Tres ambientes en simultáneo con las mejores ponencias acerca del software libre.
                </p>
              </v-flex>
            </v-layout>
          </v-container>
          <v-tabs v-model="active" color="deep-purple darken-4" dark slider-color="white" grow show-arrows height="56">
            <v-tab ripple v-for="entry in content.schedule" :key="entry.venue" >
              {{ entry.venue }}
            </v-tab>

            <v-tab-item class="white grey--text text--darken-4" ripple v-for="entry in content.schedule" :key="entry.venue">
              <v-list three-line light v-for="talk in entry.talks" :key="talk.title">
                <v-list-tile avatar>
                  <v-list-tile-avatar :color="talk.iconColor || 'grey darken-1'">
                    <v-icon v-if="talk.icon" dark>{{ talk.icon }}</v-icon>
                    <img v-else-if="talk.avatar" dark :src="talk.avatar" :alt="talk.speaker || talk.title">
                    <v-icon v-else dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-if="talk.title">{{ talk.title }}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="talk.speaker" >{{ talk.speaker }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-if="talk.schedule" >{{ talk.schedule }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-tab-item>

            <v-tab-item class="white grey--text text--darken-4">
              <v-list three-line light>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="orange lighten-2">
                    <v-icon dark>event</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Sábado 28 abril de 2018</v-list-tile-title>
                    <v-list-tile-sub-title>09:00 a 18:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="red darken-2">
                    <v-icon dark>edit</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Inscripciones</v-list-tile-title>
                    <v-list-tile-sub-title>09:00 a 09:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="assets.ronaldMelgarejo" alt="Ronald Melgarejo">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Transformación digital</v-list-tile-title>
                    <v-list-tile-sub-title>Ronald Melgarejo</v-list-tile-sub-title>
                    <v-list-tile-sub-title>9:30 - 10:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="assets.nuritziSanchez" alt="Nuritzi Sanchez">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Conociendo a GNOME</v-list-tile-title>
                    <v-list-tile-sub-title>Nurtizi Sanchez</v-list-tile-sub-title>
                    <v-list-tile-sub-title>10:30 -11:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Arduino MKR, familia tecnologica basada en Open Hardware</v-list-tile-title>
                    <v-list-tile-sub-title>Jorge Guerra</v-list-tile-sub-title>
                    <v-list-tile-sub-title>11:30 - 12:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="assets.sheylaBrena" alt="Sheyla Breña">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Ropa electrónica con Arduino Lilipad</v-list-tile-title>
                    <v-list-tile-sub-title>Sheyla Breña</v-list-tile-sub-title>
                    <v-list-tile-sub-title>12:30 - 13:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="green darken-2">
                    <v-icon dark>local_dining</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Regrigerio</v-list-tile-title>
                    <v-list-tile-sub-title>13:00 - 13:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Domotica</v-list-tile-title>
                    <v-list-tile-sub-title>Oscar Castillo</v-list-tile-sub-title>
                    <v-list-tile-sub-title>13:30 - 14:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>GNOME</v-list-tile-title>
                    <v-list-tile-sub-title>Fefa Morales</v-list-tile-sub-title>
                    <v-list-tile-sub-title>14:30 - 15:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>IOTA y arduino: alternativa Open al Blockchain</v-list-tile-title>
                    <v-list-tile-sub-title>Christopher Aldave</v-list-tile-sub-title>
                    <v-list-tile-sub-title>15:00 - 16:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Blender en la medicina</v-list-tile-title>
                    <v-list-tile-sub-title>Eduardo Diaz</v-list-tile-sub-title>
                    <v-list-tile-sub-title>16:00 - 17:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Blender en el diseño</v-list-tile-title>
                    <v-list-tile-sub-title>Sandro</v-list-tile-sub-title>
                    <v-list-tile-sub-title>17:00 - 18:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-tab-item>

            <v-tab-item class="white grey--text text--darken-4">
              <v-list three-line light>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="orange lighten-2">
                    <v-icon dark>event</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Sábado 28 abril de 2018</v-list-tile-title>
                    <v-list-tile-sub-title>09:00 a 18:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="red darken-2">
                    <v-icon dark>edit</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Inscripciones</v-list-tile-title>
                    <v-list-tile-sub-title>09:00 a 09:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Integrando Kotlin a proyectos android</v-list-tile-title>
                    <v-list-tile-sub-title>Eduardo Medina</v-list-tile-sub-title>
                    <v-list-tile-sub-title>11:00 - 12:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Desarrollando aplicaciones con Google Cloud</v-list-tile-title>
                    <v-list-tile-sub-title>Milton Yarleque</v-list-tile-sub-title>
                    <v-list-tile-sub-title>12:00 -13:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="green darken-2">
                    <v-icon dark>local_dining</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Regrigerio</v-list-tile-title>
                    <v-list-tile-sub-title>13:00 - 13:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Realidad Virtual en la Web</v-list-tile-title>
                    <v-list-tile-sub-title>Angel Quiroz</v-list-tile-sub-title>
                    <v-list-tile-sub-title>14:00 - 16:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Single Page Applications con Vue.js y Vuetify: La Web de Flisol Lima UPN</v-list-tile-title>
                    <v-list-tile-sub-title>Martin Vuelta</v-list-tile-sub-title>
                    <v-list-tile-sub-title>16:00 - 17:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-tab-item>

            <v-tab-item class="white grey--text text--darken-4">
              <v-list three-line light>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="orange lighten-2">
                    <v-icon dark>event</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Sábado 28 abril de 2018</v-list-tile-title>
                    <v-list-tile-sub-title>09:00 a 18:00</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="red darken-2">
                    <v-icon dark>edit</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Inscripciones</v-list-tile-title>
                    <v-list-tile-sub-title>09:00 a 09:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>APESOL</v-list-tile-title>
                    <v-list-tile-sub-title>Pedro Muñoz</v-list-tile-sub-title>
                    <v-list-tile-sub-title>14:30 - 15:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Fedora</v-list-tile-title>
                    <v-list-tile-sub-title>Carlos Jara</v-list-tile-sub-title>
                    <v-list-tile-sub-title>15:30 - 16:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider light></v-divider>
                <v-list-tile avatar>
                  <v-list-tile-avatar color="grey darken-1">
                    <v-icon dark>account_circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>HERE Technologies - Developer Platform</v-list-tile-title>
                    <v-list-tile-sub-title>Anthony Machuca</v-list-tile-sub-title>
                    <v-list-tile-sub-title>16:30 - 17:30</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-tab-item>
          </v-tabs>
        </v-card>

        <!-- v-card id="speakers" class="section">
          <v-container>
            Speakers
          </v-container>
        </v-card -->

        <v-card ref="faq" id="faq" class="section">
          <v-container fill-height fluid>
            <v-layout fill-height row wrap>
              <v-flex class="title gutter" xs12>
                <h1>Preguntas <strong>Frecuentes</strong></h1>
              </v-flex>
              <v-flex class="description" xs12>
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

        <v-card ref="location" id="location" class="section">
          <v-container fill-height fluid>
            <v-layout class="gutter" fill-height row wrap >
              <v-flex class="no-margin" xs12 sm6>
                <v-layout class="gutter" fill-height row wrap >
                  <v-flex class="title no-margin" xs12>
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
                    <v-list three-line subheader>
                      <v-divider></v-divider>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <v-icon color="red darken-2">place</v-icon>
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
                          <v-icon color="orange lighten-2">event</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Sábado 28 abril de 2018</v-list-tile-title>
                          <v-list-tile-sub-title>09:00 a 18:00</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <v-icon color="cyan lighten-2">email</v-icon>
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
              <v-flex xs12 sm6>
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

        <v-card id="footer" class="section">
          <v-container>
            <v-layout fill-height class="gutter" row wrap >
              <v-flex xs12 class="title" text-xs-center>
                <h1>
                  Vive el <strong>FLISoL</strong>
                </h1>
              </v-flex>
              <v-flex xs12 class="description" text-xs-center>
                <p>
                  Con el auspicio de
                </p>
              </v-flex>
              <v-flex xs12 class="logo-holder" text-xs-center>
                <img class="logo" :src="assets.logoUpn" alt="FLISOL">
              </v-flex>
              <v-flex xs12 class="logo-holder white sponsors" text-xs-center>
                <img v-for="(sponsor, name) in content.sections.footer.sponsors" :key="name" class="logo" :src="sponsor.logo" :alt="sponsor.name" :title="sponsor.name">
              </v-flex>
            </v-layout>
          </v-container>
          <v-container class="grey darken-4 white--text">
            <v-layout fill-height class="gutter" row wrap >
              <v-flex xs12 md6 text-xs-center text-md-left class="no-margin">
                © 2018 FLISoL
              </v-flex>
              <v-flex xs12 md6 text-xs-center text-md-right>
                Con <v-icon color="red darken-1" size=5>fas fa-heart</v-icon> por <a href="https://softbutterfly.io" targer="_blank" class="softbutterfly">Soft<strong>Butterfly</strong></a>
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

.page {
  postion: relative;
}

.application {
  font-family: 'Raleway', 'Roboto', sans-serif;
}

.gutter {
  box-sizing: border-box;
  margin-left: -16px;
  margin-right: -16px;

  & > * {
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .no-margin {
    margin: 0;
  }
}

.parallax {
  height: calc(150vh)!important;
  min-height: 579px;

  .parallax__content {
    height: 100vh!important;
    min-height: 500px;
  }
}

.list__tile__content {
  width: 0;
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

.main {
  z-index: 1;
  margin-top: -40vh;

  .card ~ .card {
    margin-top: 32px;
  }

  & > .content--wrap {
    & > .container {
      padding-bottom: 0;

      max-width: 750px;

      @media (min-width: 960px) {
        max-width: 850px;
      }
    }
  }
}

.card.section {
  .title {
    h1 {
      font-weight: 300;
      font-size: 1.75em;
      line-height: 1.5;
      margin: 0;
    }
  }

  .description {
    p {
      font-size: 1.35em;
      line-height: 1.5;
      font-weight: 300;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .logo {
    width: 100%;
    max-width: 320px;
    height: auto;
  }

  .logo-holder {
    .logo {
      height: 100px;
      max-width: 100%;
      width: auto;
      padding: 12px;
    }
  }
}

#toolbar-container {
  height: 56px;

  @media (min-width:641px) {
    height: 48px;
  }

  @media (min-width:960px) {
    height: 64px;
  }
}
#home {

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

.softbutterfly {
  color: #ffffff;
  text-decoration: none;

  &:hover {
    color: #2675ca;
    strong {
      color: #e53935;
    }
  }
}
</style>

<script>
import bannerBackground from "./assets/banner-background.svg"
import bannerContent from "./assets/banner-content.svg"
import logoFlisol from "./assets/logo-flisol.png"
import logoUpn from "./assets/logo-upn.svg"

import ronaldMelgarejo from "./assets/ronal_melgarejo.png"
import nuritziSanchez from "./assets/nuritzi_sanchez.png"
import sheylaBrena from "./assets/sheyla_brena.png"
import martinVuelta from "./assets/martin_vuelta.jpg"
import jorgeGuerra from "./assets/jorge_guerra.jpg"
import angelQuiroz from "./assets/angel_quiroz.jpg"
import carlosJara from "./assets/carlos_jara.jpg"
import cristopherAldave from "./assets/cristopher_aldave.jpg"

import APECIT from "./assets/apecit.png"
import APESOL from "./assets/apesol.png"
import Blender from "./assets/blender.svg"
import Fedora from "./assets/fedora.svg"
import GDG from "./assets/gdg.png"
import GNOME from "./assets/gnome.svg"
import MecInHome from "./assets/mec-in-home.png"
import SoftButterfly from "./assets/softbutterfly.svg"
import Mozilla from "./assets/mozilla.png"
import Niit from "./assets/niit.svg"
import Zonngo from "./assets/zonngo.svg"

export default {
  name: "App",
  data() {
    return {
      assets: {
        bannerBackground: bannerBackground,
        bannerContent: bannerContent,
        logoFlisol: logoFlisol,
        logoUpn: logoUpn,
        ronaldMelgarejo: ronaldMelgarejo,
        nuritziSanchez: nuritziSanchez,
        sheylaBrena: sheylaBrena
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
            includeInMeu: true,
            title: "Inicio",
            isActive: true
          },
          schedule: {
            includeInMeu: true,
            title: "Agenda",
            isActive: false
          },
          // speakers: {
          //   includeInMeu: true,
          //   title: "Ponentes",
          //   isActive: false
          // },
          faq: {
            includeInMeu: true,
            title: "FAQ",
            isActive: false
          },
          location: {
            includeInMeu: true,
            title: "Ubicación",
            isActive: false
          },
          footer: {
            includeInMeu: false,
            sponsors: {
              APECIT: {
                name: "APECIT",
                logo: APECIT
              },
              APESOL: {
                name: "APESOL",
                logo: APESOL
              },
              Blender: {
                name: "Blender",
                logo: Blender
              },
              Fedora: {
                name: "Fedora",
                logo: Fedora
              },
              GNOME: {
                name: "GNOME",
                logo: GNOME
              },
              Mozilla: {
                name: "Mozilla",
                logo: Mozilla
              },
              // Niit: {
              //   name: "Niit",
              //   logo: Niit
              // },
              MecInHome: {
                name: "MecInHome",
                logo: MecInHome
              },
              // Zonngo: {
              //   name: "Zonngo",
              //   logo: Zonngo
              // },
              SoftButterfly: {
                name: "SoftButterfly",
                logo: SoftButterfly
              },
              GDG: {
                name: "GDG",
                logo: GDG
              }
            }
          }
        },
        schedule: [
          {
            venue: "Auditorio",
            talks: [
              {
                title: "Como usar wordpress y no morir en el intento",
                speaker: "Gerson Josue Perez Aguilar",
                schedule: "9:00 - 10:00"
              },
              {
                title: "Conociendo a GNOME",
                speaker: "Nurtizi Sanchez",
                avatar: nuritziSanchez,
                schedule: "10:00 - 10:30"
              },
              {
                title: "Ponencia sorpresa",
                speaker: "Elizabeth Chumioque y Luis Soria",
                schedule: "10:30 - 11:30"
              },
              {
                title:
                  "Arduino MKR, familia tecnológica basada en Open Hardware",
                speaker: "Jorge Guerra",
                avatar: jorgeGuerra,
                schedule: "11:30 - 12:30"
              },
              {
                title: "Ropa electronica con Arduino Lilipad",
                speaker: "Sheyla Breña",
                avatar: sheylaBrena,
                schedule: "12:30 - 13:00 "
              },
              {
                title: "Refrigerio",
                schedule: "13:00 - 13:30",
                icon: "local_dining",
                iconColor: "green darken-2"
              },
              {
                title: "Uso software libre a diario, y no lo sabia",
                speaker: "Jenner Fuentes",
                schedule: "13:30 - 14:30 "
              },
              {
                title: "¿Software Libre? ¿Qué es?",
                speaker: "Pedro Muñoz",
                schedule: "14:30 - 15:30 "
              },
              {
                title: "Sobrevivir siendo mujer en el mundo del software libre",
                speaker: "Fernanda Morales",
                schedule: "15:30 - 16:00 "
              },
              {
                title:
                  "Chamilo LMS, plataforma de software libre para cursos virtuales",
                speaker: "Yannick Warnier",
                schedule: "16:00 - 17:00 "
              },
              {
                title: "Cómo un electronico sobrevive en GNU/LINUX",
                speaker: "Moises Stevend Meza Rodriguez",
                schedule: "17:00 - 18:00 "
              }
            ]
          },
          {
            venue: "Sala de conferencias 03",
            talks: [
              {
                title: "Transformación digital",
                speaker: "Ronald Melgarejo",
                avatar: ronaldMelgarejo,
                schedule: "9:30 - 11:00"
              },
              {
                title: "Introduccion a Fedora",
                speaker: "Solach Ccasa",
                schedule: "11:00 - 12:00"
              },
              {
                title: "IoT usando Microcontroladores Pic de Microchip",
                speaker: "Javier Hernández",
                schedule: "12:00 - 13:00"
              },
              {
                title: "Refrigerio",
                schedule: "13:00 - 13:30"
              },
              {
                title:
                  "Aplicaciones del protocolo estandarizado mundialmente para la Domotica KNX en el mundo",
                speaker: "Brando Boza Ccoyllar",
                schedule: "13:30 - 14:30"
              },
              {
                title: "IOTA y arduino: alternativa Open al Blockchain",
                speaker: "Christopher Pedro Luis Aldave Ovando",
                avatar: cristopherAldave,
                schedule: "14:30 - 15:30"
              },
              {
                title: "IoT en GNU/Linux",
                speaker: "Carlos Jara Alva",
                avatar: carlosJara,
                schedule: "15:30 - 16:30"
              },
              {
                title: "HERE Technologies - Developer Platform",
                speaker: "Anthony Machuca Espinoza",
                schedule: "16:30 - 17:30"
              }
            ]
          },
          {
            venue: "Laboratorio 12",
            talks: [
              {
                title: "Desarrollando aplicaciones con Google Cloud",
                speaker: "Milton Yarleque",
                schedule: "10:00 - 12:00"
              },
              {
                title: "Primeros pasos con InkScape",
                speaker: "Leyla Marcelo",
                schedule: "12:00 - 13:00"
              },
              {
                title:
                  "Comunicación GSM/GPRS/GPS/Bluetooth (iBeacon) usando Mircrocontroladores",
                speaker: "Javier Hernández",
                schedule: "13:30 - 14:00"
              },
              {
                title: "Realidad Virtual en la Web",
                speaker: "Angel Fernando Quiroz Campos",
                avatar: angelQuiroz,
                schedule: "14:00 - 16:00"
              },
              {
                title:
                  "Single Page Applications con Vue.js y Vuetify: La Web de Flisol Lima UPN",
                speaker: "Martin Vuelta Rojas",
                avatar: martinVuelta,
                schedule: "16:00 - 17:00"
              },
              {
                title: "Blender para todos",
                speaker: "Eduardo Diaz",
                schedule: "17:00 - 18:00"
              }
            ]
          }
        ]
      },
      map: {
        center: {
          lat: -11.959462,
          lng: -77.067865
        },
        options: {
          draggable: true,
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
    getActiveSection() {
      return Object.values(this.content.sections).filter(section => {
        return section.isActive
      })[0].title
    },
    scrollTo(sectionId) {
      document
        .getElementById(sectionId)
        .scrollIntoView({ block: "start", behavior: "smooth" })
      // let sectionContainerBox = document
      //   .getElementById(sectionId)
      //   .getBoundingClientRect()
      // let sectionTop = document.body.getBoundingClientRect().top

      // this.$vuetify.goTo(sectionTop - 1.5 * this.toolbarHeight)
    },
    onScroll() {
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

      let sections = this.content.sections
      sections = Object.keys(sections).filter(s => {
        return sections[s].includeInMeu
      })

      sections.forEach(section => {
        let sectionContainerBox = document
          .getElementById(section)
          .getBoundingClientRect()
        let sectionTop = Math.abs(
          document.body.getBoundingClientRect().top - sectionContainerBox.top
        )

        let sectionBottom = Math.abs(
          document.body.getBoundingClientRect().top - sectionContainerBox.bottom
        )

        if (
          sectionTop - 1.6 * this.toolbarHeight < scrollTop &&
          scrollTop < sectionBottom - 1.6 * this.toolbarHeight
        ) {
          let activeSection = sections.filter(s => {
            return this.content.sections[s].isActive
          })[0]

          if (activeSection != section) {
            this.content.sections[activeSection].isActive = false
            this.content.sections[section].isActive = true
          }
        }
      })
    },
    onResize() {
      let toolbarContainerBox = document
        .getElementById("toolbar-container")
        .getBoundingClientRect()
      let toolbar = document.getElementById("toolbar")
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop
      let toolbarTop = Math.abs(
        document.body.getBoundingClientRect().top - toolbarContainerBox.top
      )

      if (scrollTop >= toolbarTop) {
        toolbar.style.right = toolbarContainerBox.left + "px"
        toolbar.style.left = toolbarContainerBox.left + "px"
      } else {
        toolbar.style.width = ""
        toolbar.style.right = ""
      }
    }
  },
  mounted() {
    this.onResize()

    window.addEventListener("resize", this.onResize)
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize)
    }
  }
}
</script>
