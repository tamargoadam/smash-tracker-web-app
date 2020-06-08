// All Melee characters
export const CHARACTERS = ['Fox', 'Falco', 'Sheik', 'Marth', 'Captain Falcon', 'Jigglypuff', 'Ice Climbers', 'Peach', 'Pikachu',
    'Samus', 'Dr. Mario', 'Yoshi', 'Luigi', 'Mario', 'Link', 'Young Link', 'Donkey Kong', 'Ganondorf', 'Roy',
    'Mr. Game & Watch', 'Mewtwo', 'Zelda', 'Ness', 'Pichu', 'Bowser', 'Kirby'];


// Character to Stock Logo Map
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '').replace(/-/g, ' ')
        .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
        .replace('.png', '')] = r(item); });
    return images;
}

export const STOCK_LOGOS = importAll(require.context('../assets/stockLogos', false, /\.(png|jpe?g|svg)$/));

export const SNACKBAR_SEVERITY = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success'
}