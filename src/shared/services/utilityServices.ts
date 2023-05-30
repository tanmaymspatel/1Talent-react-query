/**
 * @name findFirstElementInViewPort
 * @param elements array from which first element in the viewport is to be found
 * @returns first element in the viewport
 */
const findFirstElementInViewPort = (elements: any, mainContentYOffset: any) =>
    Array.prototype.find.call(
        elements,
        element => element.getBoundingClientRect().y >= mainContentYOffset // main content offset
    );
/**
 * @name scrollToElementAfterBackClick
 * @description This method is used to preserve scroll after hitting back button
 * @param isClicked 
 * @param clickedId 
 */
const scrollToElementAfterBackClick = (isClicked: string, clickedId: string): void => {
    if (isClicked === "true") {
        document.querySelector(`.user-${clickedId}`)?.scrollIntoView();
    }
}

const utilityServices = {
    findFirstElementInViewPort,
    scrollToElementAfterBackClick
}

export default utilityServices;