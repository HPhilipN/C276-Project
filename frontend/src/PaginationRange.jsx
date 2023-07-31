
export const returnPaginationRange = (currentPage, totalPage, limit, siblings) => {

    let totalPageNoInArray = 7 + siblings;
    //show no ellipses
    if(totalPageNoInArray >= totalPage){
        _.range(1, totalPage +1)
    }
    //show left elippses
    let leftSiblingsIndex = Math.max(currentPage - siblings, 1); // ensures value not negative
    let showLeftDots = leftSiblingsIndex > 2

    // show right elippses
    let rightSiblingsIndex = Math.min(currentPage + siblings, totalPage);
    let showRightDots = rightSiblingsIndex < totalPage - 2

    // show right dots only
    if(!showLeftDots && showRightDots){
        let leftItemsCount = 3 +2 * siblings;
        let leftRange = _.range(1, leftItemsCount +1);
        return[...leftRange, " ...", totalPage];
    } else if (showLeftDots && !showRightDots){
        let rightItemsCount = 3 + 2 * siblings;
        let rightRange = _.range(totalPage - rightItemsCount+1, totalPage+1);
        return[1, "... ", ...rightRange];
    } else {
        let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex+1);
        return [1, "... ", ...middleRange, " ...", totalPage];
    }

}