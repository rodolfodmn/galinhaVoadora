/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
   

    onDeviceReady: function() {
         function initAd(){
            if ( window.plugins && window.plugins.AdMob ) {
                var ad_units = {
                    ios : {
                        banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',       //PUT ADMOB ADCODE HERE 
                        interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'  //PUT ADMOB ADCODE HERE 
                    },
                    android : {
                        banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',       //PUT ADMOB ADCODE HERE 
                        interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'  //PUT ADMOB ADCODE HERE  
                    }
                };
                var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;
     
                window.plugins.AdMob.setOptions( {
                    publisherId: admobid.banner,
                    interstitialAdId: admobid.interstitial,
                    adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,  //use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD 
                    bannerAtTop: false, // set to true, to put banner at top 
                    overlap: true, // banner will overlap webview  
                    offsetTopBar: false, // set to true to avoid ios7 status bar overlap 
                    isTesting: false, // receiving test ad 
                    autoShow: false // auto show interstitial ad when loaded 
                });
     
                registerAdEvents();
                window.plugins.AdMob.createInterstitialView();  //get the interstitials ready to be shown 
                window.plugins.AdMob.requestInterstitialAd();
     
            } else {
                //alert( 'admob plugin not ready' ); 
            }
        }
        //functions to allow you to know when ads are shown, etc. 
        function registerAdEvents() {
            document.addEventListener('onReceiveAd', function(){});
            document.addEventListener('onFailedToReceiveAd', function(data){});
            document.addEventListener('onPresentAd', function(){});
            document.addEventListener('onDismissAd', function(){ });
            document.addEventListener('onLeaveToAd', function(){ });
            document.addEventListener('onReceiveInterstitialAd', function(){ });
            document.addEventListener('onPresentInterstitialAd', function(){ });
            document.addEventListener('onDismissInterstitialAd', function(){
                window.plugins.AdMob.createInterstitialView();          //REMOVE THESE 2 LINES IF USING AUTOSHOW 
                window.plugins.AdMob.requestInterstitialAd();           //get the next one ready only after the current one is closed 
            });
        }
        //display the banner 
        function showBannerFunc(){
            window.plugins.AdMob.createBannerView();
        }
        //display the interstitial 
        function showInterstitialFunc(){
            window.plugins.AdMob.showInterstitialAd();
        }

        initAd();

        //variaveis
        //recebe tela h w
        var H = (window.screen.height)*0.9;
        var W = (window.screen.width);
         
        //jogo rodando 
        var countPro = localStorage.getItem("countPro");
        var Jrun = true;
        var pontos = 0;
        var som = localStorage.getItem("som");

        //jogador
        var posA = 0;
        var srcG = ["img/Ga/galinhaE.gif", "img/Ga/galinhaE1.gif", "img/Ga/galinhaE2.gif", "img/Ga/galinhaE3.gif","img/Ga/galinhaE4.gif", "img/Ga/galinhaE5.gif"];
        var Jx = (W/2-(10)), Jy = 100;
        var imgGalinha = document.createElement("img");
            imgGalinha.src = srcG[posA];

        //barra
        var Bx = 0, By = H;
        var Bx1 = Math.floor(Math.random() *W);
        var By1 = H+H/4;
        var Bx2 = Math.floor(Math.random() *W);
        var By2 = H+H/2;
        var imgBarra = document.createElement("img");
            imgBarra.src = "img/barra.gif";

        //nuvem
        var Nx = 0, Ny = H/8;
        var Nx1 = Math.floor(Math.random() *W);
        var Ny1 = H/4+H/8;
        var Nx2 = Math.floor(Math.random() *W);
        var Ny2 = H/2+H/8;
        var Nx3 = Math.floor(Math.random() *W);
        var Ny3 = H;
        var srcN = ["img/nuvem.gif", "img/nuvem2.gif"];
        var imgNuvem = document.createElement("img");
            imgNuvem.src = srcN[0];

        if (localStorage.getItem("som") == null) {
            localStorage.setItem("som", 1);
        }
        
        //cria canvas
        id("tela").innerHTML = "<canvas id='canvas' height='" +H+"' width='"+W+"'></canvas>";
        var ctx = id("canvas").getContext("2d");
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        // id("musica").play();

        if (localStorage.getItem("som") == null) {
            localStorage.setItem("som", 1);
        }
        if (localStorage.getItem("countPro") == null) {
            localStorage.setItem("countPro", 0);
        }
        
        // var myAudio = id("musica"); 
        // myAudio.ontimeupdate= function(i) {
        //   if((this.currentTime / this.duration)>0.86){
        //     this.currentTime = 0;
        //     this.play();
        //   }
        // };
        // if (som == 1) {
        //     myAudio.play();
        // }

        if (localStorage.getItem("ranck") == null) {
            localStorage.setItem("ranck", pontos);
        }

        //eventos
        
        //controle
        id("canvas").addEventListener("click", move);
        
        //tela
        var jogo = setInterval(tela, 30);
        var animaG = setInterval(animaG, 100);
        var geraPontos = setInterval(pontoAdd, 1000);

        //funcoes
        function id(x){
            return document.getElementById(x);
        }

        function animaG() {
            if (posA < 5) {
                posA++;
                imgGalinha.src = srcG[posA];
            }else{
                posA = 0;
                imgGalinha.src = srcG[posA];
            }
        }

        function pontoAdd(){
            pontos++;
        }

        function nuvens() {
            ctx.drawImage(imgNuvem,Nx,Ny);
            Ny -= 3;
            if (Ny < -69) {
                Ny = H;
                Nx = Math.floor(Math.random() *W);
            }
            ctx.drawImage(imgNuvem,Nx1,Ny1);
            Ny1 -= 3;
            if (Ny1 < -69) {
                Ny1 = H;
                Nx1 = Math.floor(Math.random() *W);
            }
            ctx.drawImage(imgNuvem,Nx2,Ny2);
            Ny2 -= 3;
            if (Ny2 < -69) {
                Ny2 = H;
                Nx2 = Math.floor(Math.random() *W);
            }
            ctx.drawImage(imgNuvem,Nx3,Ny3);
            Ny3 -= 3;
            if (Ny3 < -69) {
                Ny3 = H;
                Nx3 = Math.floor(Math.random() *W);
            }
        }

        function barras() {
            ctx.drawImage(imgBarra,Bx,By);
            //ctx.fillRect(Bx,By,100,10);
            By -= 8;
            if (By < -30) {
                By = H;
                Bx = Math.floor(Math.random() *W);
            }
            ctx.drawImage(imgBarra,Bx1,By1);
            By1 -= 8;
            if (By1 < -30) {
                By1 = H;
                Bx1 = Math.floor(Math.random() *W);
            }
            ctx.drawImage(imgBarra,Bx2,By2);
            By2 -= 8;
            if (By2 < -30) {
                By2 = H;
                Bx2 = Math.floor(Math.random() *W);
            }
        }
        
        function novoJogo(){
            Jrun == true;
            Jx = (W/2-(10)), Jy = 100;
            Bx = 0, By = H;

            jogo = setInterval(tela, 30);
        }

        function colide() {
            if (By < (Jy+110) && By > Jy) {
                if ((Bx+100) > Jx+10 && Bx < Jx+40) {
                    if(som == 1){
                        id("batida").play();
                    }
                    countPro++;
                    localStorage.setItem("countPro", countPro);
                    if (countPro > 3) {
                        showInterstitialFunc();
                    }
                    Jrun = false;
                    clearInterval(jogo);
                    clearInterval(geraPontos);
                    id("menuNovoJ").style.display = "block";
                    ranck = localStorage.getItem("ranck");
                    if (ranck < pontos) {
                        localStorage.setItem("ranck", pontos);
                    }
                    id("ranck").innerHTML = ranck;
                }
            }
            if (By1 < (Jy+110) && By1 > Jy) {
                if ((Bx1+100) > Jx+10 && Bx1 < Jx+40) {
                    if(som == 1){
                        id("batida").play();
                    }
                    countPro++;
                    localStorage.setItem("countPro", countPro);
                    if (countPro > 3) {
                        showInterstitialFunc();
                    }
                    Jrun = false;
                    clearInterval(jogo);
                    clearInterval(geraPontos);
                    id("menuNovoJ").style.display = "block";
                    ranck = localStorage.getItem("ranck");
                    if (ranck < pontos) {
                        localStorage.setItem("ranck", pontos);
                    }
                    id("ranck").innerHTML = ranck;
                }
            }
            if (By2 < (Jy+110) && By2 > Jy) {
                if ((Bx2+100) > Jx+10 && Bx2 < Jx+40) {
                    if(som == 1){
                        id("batida").play();
                    }
                    countPro++;
                    localStorage.setItem("countPro", countPro);
                    if (countPro > 3) {
                        showInterstitialFunc();
                    }
                    Jrun = false;
                    clearInterval(jogo);
                    clearInterval(geraPontos);
                    id("menuNovoJ").style.display = "block";
                    ranck = localStorage.getItem("ranck");
                    if (ranck < pontos) {
                        localStorage.setItem("ranck", pontos);
                    }
                    id("ranck").innerHTML = ranck;
                }
            }
        }

        function move(e) {
            if (Jrun) {
                var cx = e.clientX;
                var cy = e.clientY;

                if (cx < (W/2)) {
                    if(som == 1){
                        id("asa").play();
                    }
                    if (Jx >= 10) {
                        Jx -= 20;
                    }
                }else{
                    if(som == 1){
                        id("asa").play();
                    }
                    if (Jx<=(W-20)) {
                        Jx += 20;
                    }
                }
            }else{
                novoJogo();    
            }
        }

        function tela() {
            if (Jrun == true) {
                ctx.clearRect(0,0, W, H);
                nuvens();
                ctx.drawImage(imgGalinha,Jx,Jy);
                //ctx.fillRect(Jx+10,Jy,40,110);
                colide();
                barras();
                if (countPro > 4) {
                    countPro = 0;
                    localStorage.setItem("countPro", 0);
                }
                ctx.fillText("pontos: "+pontos, 10,30);
                move();
                // Jy += 5;
            }else{
            }
        }
    }
    

    // Update DOM on a Received Event
};
