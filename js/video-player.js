(function(){
    var player = document.querySelector('#player');
    var video = player.querySelector('#video');
    var play = player.querySelector('#playVideo');
    var pause =  player.querySelector('#pauseVideo');
    var full =  player.querySelector('#fullscreenVideo');
    var volumeBar = player.querySelector('#volume-bar');
    var volume0 = player.querySelector('#muteVideo0');
    var volume1 = player.querySelector('#muteVideo1');
    var volume2 = player.querySelector('#muteVideo2');
    var volume3 = player.querySelector('#muteVideo3');
    var volumeTrigger = player.querySelector('#volumeIcons');
    var mediaControls = player.querySelector('#mediaControls');
    var timeNow = player.querySelector('#videoCurrentTime');
    var timeAll = player.querySelector('#videoAllTime');
    var seekbarOut = player.querySelector('#seekBarOut');
    var svgPause = player.querySelector('#pauseIcon');
    var svgPlay = player.querySelector('#playIcon');



    play.addEventListener('click',function () {
        video.play()
    });

    pause.addEventListener('click',function () {
        video.pause()
    });

    full.addEventListener('click',function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });

    volumeBar.addEventListener('input', function() {
        video.volume = volumeBar.value;

        if(volumeBar.value > 0.6) {
            iconChange(volume3);
        } else if(volumeBar.value > 0.2) {
            iconChange(volume2);
        } else if(volumeBar.value != 0) {
            iconChange(volume1);
        } else {
            iconChange(volume0);
        }

        function iconChange(show) {
            var allStates = volumeIcons.querySelectorAll('div');
            for( var i = 0; i < allStates.length; i++) {
                allStates[i].classList.add('hidden');
            }
            show.classList.remove('hidden');
        }
    });

    video.addEventListener('playing',function () {
        play.classList.add('hidden');
        svgPause.classList.remove('hidden');
        svgPlay.classList.add('hidden');

    });

    video.addEventListener('pause',function () {
        play.classList.remove('hidden');
        svgPlay.classList.remove('hidden');
        svgPause.classList.add('hidden');
    });

    video.addEventListener('click',function () {
        videoPlayPause()
    });

    volumeTrigger.addEventListener('click',function () {
        volumeBar.value = 0;
        video.volume = 0;
    });

    function videoPlayPause() {
        if(!video.paused) {
            video.pause();
        } else {
            video.play();
        }
    }

    function videoFullOpen() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

    function timeOutput() {
        var time = video.currentTime;
        var timeRound = time.toString().toHHMMSS();
        timeNow.innerHTML = timeRound;
        timeAll.innerHTML = video.duration.toString().toHHMMSS();
    }

    video.addEventListener('timeupdate', function () {
        timeOutput();
    });

    video.addEventListener('seeking',function () {
        play.classList.add('hidden');
    });


    function isVideoFocus(e) {
        if(e.target == video || e.target == mediaControls ) {
            video.classList.add('isFocus');
            return true
        } else {
            video.classList.remove('isFocus');
            return false
        }
    }

    function keyBind(e) {
        if (e.keyCode == 32) {
            e.preventDefault();
            videoPlayPause();
        }

        if(e.keyCode == 102) {
            e.preventDefault();
            videoFullOpen();
        }
    }

    document.addEventListener('click', function (e) {
        isVideoFocus(e);
    });

    document.addEventListener('keypress', function (e) {
        if(video.classList.contains('isFocus')) {
            keyBind(e)
        }
    });

    //simple feature test
    if(!document.createElement('video').canPlayType){
        return;
    }

    //the mediaplayer is the wrapper for all controls
    function createPlayer(mediaplayer){
        var video = mediaplayer.querySelector('video');
        var seekBar = mediaplayer.querySelector('.seekbar');

        if(seekBar){
            createSeekBar(video, seekBar, seekbarOut);
        }
    }

    function createSeekBar(video, seekBar, seekbarOut) {
        var duration, videoWasPaused;
        var blockSeek = false;

        function enableDisableSeekBar(){
            duration = video.duration;
            if(duration && !isNaN(duration)){
                seekBar.max = duration;
                // seekBar.disabled = false;

                seekbarOut.max = duration;
                seekbarOut.disabled = false;
            } else   {
                seekBar.disabled = true;
                seekbarOut.disabled = true;
            }
        }

        function onSeek(){
            if(!blockSeek){
                blockSeek = true;
                videoWasPaused = video.paused;
                video.pause();
            }
            video.currentTime = seekbarOut.value;
        }

        function onSeekRelease(){
            if(!videoWasPaused){
                video.play();
            }
            blockSeek = false;
        }

        function onTimeupdate(){
            if(!blockSeek){
                seekbarOut.value = video.currentTime;
                seekBar.value = video.currentTime;
            }
        }

        //or durationchange
        video.addEventListener('loadedmetadata', enableDisableSeekBar, false);
        video.addEventListener('emptied', enableDisableSeekBar, false);
        video.addEventListener('timeupdate', onTimeupdate,false);

        seekBar.addEventListener('input', onSeek, false);
        seekBar.addEventListener('change', onSeekRelease, false);

        seekbarOut.addEventListener('input', onSeek, false);
        seekbarOut.addEventListener('change', onSeekRelease, false);

        enableDisableSeekBar();
        onTimeupdate();
    }

    Array.prototype.forEach.call(document.querySelectorAll('.mediaplayer'), createPlayer);
})();

/*time convert*/

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours  = "0" +hours;}
    if (minutes < 10) {minutes = minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    // return hours + ':' + minutes + ':' + seconds;
    return minutes + ':' +seconds
};

// video rating

function ratingStars() {
    var ratingContainer = document.querySelector('.rating-wrap');
    var starsArr = ratingContainer.querySelectorAll('.rating-item');
    var rating = document.querySelector('#videoRating');

    ratingContainer.addEventListener('click', function(e) {
        var target = e.target;
        if (target.tagName == 'svg' || target.tagName == 'path') {
            var parent = target.closest('.rating-item');
            var ratingStar = parseInt(parent.title);
            rating.value = ratingStar;
            clearAllStars();
            selectStar();
            disableSelect();

            function selectStar() {
                for (var i = 0; i < ratingStar; i++) {
                    starsArr[i].classList.add('selected')
                }
            }
        }
    });

    ratingContainer.addEventListener('mouseover', function (e) {
        if(ratingContainer.classList.contains('selected')) {
            return
        } else {
            clearAllStars();
            var target = e.target;
            if (target.tagName == 'svg' || target.tagName == 'path') {
                var parent = target.closest('.rating-item');
                var ratingStar = parseInt(parent.title);

                for (var i = 0; i < ratingStar; i++) {
                    starsArr[i].classList.add('selected');
                }
            }
        }
    });

    ratingContainer.addEventListener('mouseout',function () {
        if(ratingContainer.classList.contains('selected')) {
            return
        } else {
            clearAllStars()
        }
    })

    rating.addEventListener('change', function () {
        console.log(rating.value);
    })

    function disableSelect() {
        ratingContainer.classList.add('selected')
    }

    function clearAllStars() {
        for(var i = 0; i < starsArr.length; i++) {
            starsArr[i].classList.remove('selected')
        }
    }
}

//work only if page contains rating
if(document.getElementById('videoRating')!==null) {
    ratingStars();
}