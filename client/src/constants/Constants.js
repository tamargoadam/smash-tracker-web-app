// All Melee characters
export const CHARACTERS = ['Fox', 'Falco', 'Sheik', 'Marth', 'Captain Falcon', 'Jigglypuff', 'Ice Climbers', 'Peach', 'Pikachu',
    'Samus', 'Dr. Mario', 'Yoshi', 'Luigi', 'Mario', 'Link', 'Young Link', 'Donkey Kong', 'Ganondorf', 'Roy',
    'Mr. Game & Watch', 'Mewtwo', 'Zelda', 'Ness', 'Pichu', 'Bowser', 'Kirby'];

// Character to stock logo map
export const STOCK_LOGOS = mapToImages(require.context('../assets/stockLogos', false, /\.(png|jpe?g|svg)$/));


// All legal Melee stages
export const LEGAL_STAGES = ['Battlefield', 'Dream Land', 'Final Destination', 'Fountain of Dreams', 'Pokemon Stadium', 'Yoshi\'s Story']

// Stage to stage image map
export const LEGAL_STAGE_IMAGES = mapToImages(require.context('../assets/stages', false, /\.(png|jpe?g|svg)$/));


// Snackbar severity levels
export const SNACKBAR_SEVERITY = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success'
}


// Game Obj Keys
export const GAME_DATA = {
    user_char: "user_char",
    opponent_char: "opponent_char",
    stage: "stage",
    win: "win",
    user_stock: "user_stock",
    opponent_stock: "opponent_stock"
}

// Mapping helper function
function wordToUppercase(txt) {
    if (txt === "of")
        return txt;
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

function mapToImages(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '').replace(/-/g, ' ')
        .replace(/\w\S*/g, function(txt){ return wordToUppercase(txt)})
        .replace(/\.(png|jpe?g|svg)/, '')] = r(item); });
    return images;
}