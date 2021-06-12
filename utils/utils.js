// import { popupOverlayOpenImage } from '../utils/constants.js';

// export function openPopupImageHandler(item) {
//     openPopup(popupOverlayOpenImage);
//     const thisImage = popupOverlayOpenImage.querySelector('.popup-image__image');
//     thisImage.src = item.link;
//     thisImage.alt = item.name;
//     thisCaption.textContent = item.name;
//     const thisCaption = popupOverlayOpenImage.querySelector('.popup-image__caption');
// }

// export function openPopup(popup) {
//     popup.classList.add('overlay_opened');
//     setEventListenerOnDocument('keydown', closeOpenedPopup);
// }

// export function closePopup(popup) {
//     popup.classList.remove('overlay_opened');
//     removeEventListenerOnDocument('keydown', closeOpenedPopup);
// }

// function setEventListenerOnDocument(event, nameFunction) {
//     document.addEventListener(event, nameFunction);
// }
// function removeEventListenerOnDocument(event, nameFunction) {
//     document.removeEventListener(event, nameFunction);
// }

// function closeOpenedPopup(e) {
//     if (e.key === 'Escape') {
//         closePopup(getOpenedPopup());
//     }
// }

// function getOpenedPopup() {
//     return document.querySelector('.overlay_opened');
// }