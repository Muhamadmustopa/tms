const state={screen:"home",participant:{name:"",email:""},currentSlide:0,answers:{},isSaving:false};
const STORAGE_KEY="TMS_TRAINING_STATE";
function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({screen:state.screen,participant:state.participant,currentSlide:state.currentSlide,answers:state.answers}));}catch(e){console.error("Gagal menyimpan state:",e)}}
function loadState(){try{const saved=localStorage.getItem(STORAGE_KEY);if(!saved)return false;const data=JSON.parse(saved);if(!data)return false;state.screen=data.screen||"home";state.participant=data.participant||{name:"",email:""};state.currentSlide=Number.isInteger(data.currentSlide)?data.currentSlide:0;state.answers=data.answers||{};const total=getSlides().length;if(!total)state.currentSlide=0;else if(state.currentSlide<0)state.currentSlide=0;else if(state.currentSlide>=total)state.currentSlide=total-1;return true}catch(e){console.error("Gagal membaca state:",e);localStorage.removeItem(STORAGE_KEY);return false}}
function clearTrainingState(){localStorage.removeItem(STORAGE_KEY)}
 
