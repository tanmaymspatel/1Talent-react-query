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
/**
 * 
 * @param selectedCategories checked categories tob e filter un form of array
 * @param filterFields all the categories in form of object of name id
 * @param defaultLabel 
 * @returns 
 */
const setFilterLabel = (selectedCategories: any[], filterFields: any, defaultLabel: string) => {
    let label: string = "";
    selectedCategories.sort((a: any, b: any) => a - b);
    switch (defaultLabel) {
        case "Employment Type": {
            const firstSelectedcategory = filterFields.data?.find((field: any) => (field?.employmentTypeId === selectedCategories[0]))
            label = firstSelectedcategory?.employmentType;
            break;
        }
        case "Domains":
        case "Designations":
        case "Gender": {
            const firstSelectedcategory = filterFields.data?.find((field: any) => (field?.id === selectedCategories[0]))
            label = firstSelectedcategory?.name;
            break;
        }
        default:
            break;
    }
    if (selectedCategories.length) {
        if (selectedCategories.length > 1) {
            return `${label} (+${selectedCategories.length - 1})`
        }
        return label;
    }
    return defaultLabel;
}

const getFormattedDate = (date: string) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const inputDate = new Date(date);
    const day = inputDate.getDate();
    const month = inputDate.getMonth();
    const year = inputDate.getFullYear();
    const outputDate = `${day} ${monthNames[month]}, ${year}`
    return outputDate;
}

const utilityServices = {
    findFirstElementInViewPort,
    scrollToElementAfterBackClick,
    setFilterLabel,
    getFormattedDate
}

export default utilityServices;