const moment = require('moment');

module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format);
    },

    truncate: (str, len) => {
        if (str.length > len && str.length > 0) {
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    stripTags: (input) => {
        let string = input.replace(/<[^>]*>/gm, '');
        return string.replace(/&.*?;/)
    },
    editIcon: (storyUser, loggedUser, storyId, floating = true) => {
        if (storyUser._id.toString() === loggedUser._id.toString()) {
            if (floating) {
                return `<a href='/stories/edit/${storyId}' class='btn-floating
                halfway-fab blue'><i class='fas fa-edit fa-small'></i></a>`
            } else {
                return `<a href='/stories/edit/${storyId}'><i class='fas fa-edit'></i></a>`
            }
        } else {
            return ''
        }
    },
}