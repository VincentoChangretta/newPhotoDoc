import { FC, useRef, useState, useEffect, ChangeEvent } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

interface VideoProps {
   src: string;
   poster?: string;
   autoPlay?: boolean;
   loop?: boolean;
   muted?: boolean;
   className?: string;
}

export const Video: FC<VideoProps> = ({
   src,
   poster,
   autoPlay = false,
   loop = false,
   muted = false,
   className = '',
}) => {
   const videoRef = useRef<HTMLVideoElement | null>(null);
   const containerRef = useRef<HTMLDivElement | null>(null);

   const [isPlaying, setIsPlaying] = useState(autoPlay);
   const [volume, setVolume] = useState(1);
   const [savedVolume, setSavedVolume] = useState(volume);
   const [duration, setDuration] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);
   const [controlsVisible, setControlsVisible] = useState(false);
   const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

   const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;

      if (video.paused) {
         video.play();
         setIsPlaying(true);
      } else {
         video.pause();
         setIsPlaying(false);
      }
   };

   const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (videoRef.current) videoRef.current.volume = newVolume;
   };

   const saveAndSetVolume = () => {
      const newVolume = volume > 0 ? 0 : savedVolume || 1;
      setSavedVolume(volume);
      setVolume(newVolume);
      if (videoRef.current) {
         videoRef.current.volume = newVolume;
      }
   };
   const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
      const time = parseFloat(e.target.value);
      if (videoRef.current) {
         videoRef.current.currentTime = time;
         setCurrentTime(time);
      }
   };

   const showControls = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setControlsVisible(true);
      hideTimerRef.current = setTimeout(() => {
         setControlsVisible(false);
      }, 3000);
   };

   const getSliderStyle = (value: number, max: number, color: string) => ({
      background: `linear-gradient(to right, ${color} 0%, ${color} ${(value / max) * 100}%, rgba(255,255,255,0.2) ${
         (value / max) * 100
      }%, rgba(255,255,255,0.2) 100%)`,
   });

   useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleMouseMove = () => showControls();
      const handleMouseEnter = () => showControls();

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);

      if (autoPlay) showControls();

      return () => {
         container.removeEventListener('mousemove', handleMouseMove);
         container.removeEventListener('mouseenter', handleMouseEnter);
         if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      };
   }, []);

   useEffect(() => {
      if (videoRef.current) {
         const video = videoRef.current;
         const updateTime = () => setCurrentTime(video.currentTime);
         const loadMetadata = () => setDuration(video.duration);

         video.addEventListener('timeupdate', updateTime);
         video.addEventListener('loadedmetadata', loadMetadata);

         return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', loadMetadata);
         };
      }
   }, []);

   return (
      <div
         ref={containerRef}
         className={`relative w-full rounded-stdRadius overflow-hidden ${className} ring-2 ring-white/10`}
      >
         <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            controls={false}
            loop={loop}
            muted={muted}
            className='w-full rounded-stdRadius'
         >
            Ваш браузер не поддерживает видео.
         </video>

         {/* Play Button (Center) */}
         <button
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity cursor-pointer duration-200 ${
               controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
         >
            <span className='w-14 h-14 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white backdrop-blur-xl text-xl hover:scale-110 transition-transform max-530:w-10 max-530:h-10'>
               {isPlaying ? <FaPause /> : <FaPlay />}
            </span>
         </button>

         {/* Controls */}
         {!isMobile && (
            <div
               className={`absolute left-0 bottom-0 w-full px-5 py-3 flex flex-col gap-2 backdrop-blur-xl z-10 transition-opacity duration-300 max-530:py-2 ${
                  controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
               }`}
            >
               {/* Progress bar */}
               <input
                  type='range'
                  min={0}
                  max={duration}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  style={getSliderStyle(currentTime, duration || 1, '#fff')}
                  className='w-full h-2 appearance-none rounded-full cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:w-3
                  [&::-moz-range-thumb]:h-3
                  [&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-none
                  [&::-moz-range-thumb]:rounded-full'
               />

               <div className='flex justify-between items-center w-full'>
                  {/* Play Button (Left corner) */}
                  <button
                     onClick={togglePlay}
                     className='text-white text-8xl cursor-pointer duration-300 hover:scale-110'
                  >
                     {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                  </button>

                  {/* Volume */}
                  <div className='flex gap-5 items-center w-[200px]'>
                     <FaVolumeUp
                        className='text-white text-4xl cursor-pointer  duration-300 hover:scale-110'
                        onClick={saveAndSetVolume}
                     />
                     <input
                        type='range'
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        style={getSliderStyle(volume, 1, '#fff')}
                        className='w-full h-2 appearance-none rounded-full cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-3
                        [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-moz-range-thumb]:appearance-none
                        [&::-moz-range-thumb]:w-3
                        [&::-moz-range-thumb]:h-3
                        [&::-moz-range-thumb]:bg-white
                        [&::-moz-range-thumb]:border-none
                        [&::-moz-range-thumb]:rounded-full'
                     />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
