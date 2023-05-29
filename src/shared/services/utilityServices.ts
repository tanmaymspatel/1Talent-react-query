// const mainContainerRef = document.getElementById("main")
// const mainContentYOffset: any = mainContainerRef?.getBoundingClientRect().y

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

const utilityServices = {
    findFirstElementInViewPort
}

export default utilityServices;