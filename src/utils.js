
export const formatFutureDate = (offset) => {
    var currentDate = new Date();
    // to add #offset days to current dates
    currentDate.setDate(currentDate.getDate() + parseInt(offset));

    return new Intl.DateTimeFormat("fr-CA", {
        year: "numeric", month: "2-digit", day: "2-digit"
    }).format(currentDate);
};