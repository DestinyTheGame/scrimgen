/**
 *  Randomize array in-place using Durstenfeld shuffle algorithm.
 *
 * @public
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function randomizeMaps(modes = []) {
    const target = document.getElementById('target');

    //
    // Current selection of maps that are available in the game.
    //
    // - `name` Human readable name of the map.
    // - `size` indicates the physical size of map, in t-shirt size.
    // - `modes` List of modes this map can be used in.
    //
    const maps = [
        {name: 'Altar of Flame', size: 'm', modes: ['clash']},
        {name: 'Anomaly', size: 's', modes: ['clash']},
        {name: 'Bannerfall', size: 'm', modes: ['clash']},
        {name: 'Burnout', size: 's', modes: ['clash']},
        {name: 'Cauldron', size: 's', modes: ['clash']},
        {name: 'Convergence', size: 'm', modes: ['clash']},
        {name: 'Dead Cliffs', size: 's', modes: ['clash']},
        {name: 'Endless Vale', size: 's', modes: ['clash']},
        {name: 'Exodus Blue', size: 's', modes: ['clash']},
        {name: 'Fortress', size: 'l', modes: ['clash']},
        {name: 'Fragment', size: 'l', modes: ['clash']},
        {name: 'Javelin-4', size: 's', modes: ['clash']},
        {name: 'Midtown', size: 'l', modes: ['clash']},
        {name: 'Pacifica', size: 'm', modes: ['clash']},
        {name: 'Radiant Cliffs', size: 'l', modes: ['clash']},
        {name: 'Rusted Lands', size: 'm', modes: ['clash']},
        {name: 'Twilight Gap', size: 'm', modes: ['clash']},
        {name: 'Widow\'s Court', size: 'l', modes: ['clash']},
        {name: 'Wormhaven', size: 'm', modes: ['clash']}
    ];

    /**
     * Render the current map selection based on the pre-defined filters.
     *
     * @private
     */
    function render() {
        const size = Array.from(document.querySelectorAll('input[name="size"]:checked')).map((elem) => elem.value);
        const amount = document.getElementById('amount').value;

        const available = maps.filter(function filter(map) {
            if (!size.includes(map.size)) return false;
            if (!modes.length) return true;

            return map.modes.some(function some(mode) {
                return modes.include(mode);
            });
        });

        // Shuffle the list of relevant maps. The first three maps are chosen
        shuffleArray(available);
        const selection = available.slice(0, 3);

        if (!selection.length) return target.innerHTML = `
          <div class="empty">
            <div class="empty-icon">
              <i class="icon icon-emoji"></i>
            </div>
            <p class="empty-title h5">Congratulations</p>
            <p class="empty-subtitle">You've successfully selected no maps, you muppet</p>
          </div>
        `;

        target.innerHTML = '<ol>' + selection.map(function format(map) {
            return `<li><span class="chip">${map.name}</span></li>`;
        }).join('') + '</ol>';
    }


    // We have a bunch of advanced settings for our power uses that want to
    // generate a custom map selection so we want to ensure that we update
    // our results when changes happen.
    Array.from(document.getElementsByTagName('input')).forEach(function listen(elem) {
        elem.addEventListener('change', render);
    });

    document.getElementById('again').addEventListener('click', render);
    return render();
}

// Run this function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    randomizeMaps();
});