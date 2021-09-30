(function randomizeMaps(modes = []) {
  /**
   * Randomize array in-place using Durstenfeld shuffle algorithm.
   *
   * @param {array} array The array to shuffle.
   * @private
   */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const target = document.getElementById('target');

  // Current selection of maps that are available in the game.
  //
  // - `name` Human readable name of the map.
  // - `size` indicates the physical size of map, in t-shirt size.
  // - `modes` List of modes this map can be used in.
  // - `image` Name of the image icon associated with the given map
  const maps = [
    {name: 'Altar of Flame', size: 'm', modes: ['clash'], image: 'altar_of_flame.jpg'},
    {name: 'Bannerfall', size: 'm', modes: ['clash'], image: 'bannerfall.jpg'},
    {name: 'Cauldron', size: 's', modes: ['clash'], image: 'cauldron.jpg'},
    {name: 'Convergence', size: 'm', modes: ['clash'], image: 'convergence.jpg'},
    {name: 'Distant Shore', size: 'm', modes: ['clash'], image: 'distant_shore.jpg'},
    {name: 'Endless Vale', size: 's', modes: ['clash'], image: 'endless_vale.jpg'},
    {name: 'Exodus Blue', size: 's', modes: ['clash'], image: 'exodus_blue.jpg'},
    {name: 'Fragment', size: 'l', modes: ['clash'], image: 'fragment.jpg'},
    {name: 'Javelin-4', size: 's', modes: ['clash'], image: 'javelin_4.jpg'},
    {name: 'Midtown', size: 'l', modes: ['clash'], image: 'midtown.jpg'},
    {name: 'Pacifica', size: 'm', modes: ['clash'], image: 'pacifica.jpg'},
    {name: 'Radiant Cliffs', size: 'l', modes: ['clash'], image: 'radiant_cliffs.jpg'},
    {name: 'Rusted Lands', size: 'm', modes: ['clash'], image: 'rusted_lands.jpg'},
    {name: 'The Anomaly', size: 's', modes: ['clash'], image: 'the_anomaly.jpg'},
    {name: 'The Burnout', size: 's', modes: ['clash'], image: 'the_burnout.jpg'},
    {name: 'The Dead Cliffs', size: 's', modes: ['clash'], image: 'the_dead_cliffs.jpg'},
    {name: 'The Fortress', size: 'l', modes: ['clash'], image: 'the_fortress.jpg'},
    {name: 'Twilight Gap', size: 'm', modes: ['clash'], image: 'twilight_gap.jpg'},
    {name: 'Widow\'s Court', size: 'l', modes: ['clash'], image: 'widows_court.jpg'},
    {name: 'Wormhaven', size: 'm', modes: ['clash'], image: 'wormhaven.jpg'}
  ];

  /**
   * Render the current map selection based on the pre-defined filters.
   *
   * @param {Event} [event] An optional Event argument for handling event listeners.
   * @private
   */
  function render(event = null) {
    if (event !== null && event.preventDefault) event.preventDefault();

    const size = Array.from(document.querySelectorAll('input[name="size"]:checked')).map((elem) => elem.value);
    const amount = document.getElementById('amount').value;

    const available = maps.filter(function filter(map) {
      if (!size.includes(map.size)) return false;
      if (!modes.length) return true;

      return map.modes.some(function some(mode) {
        return modes.include(mode);
      });
    });

    // Shuffle the list of relevant maps. The first N (`amount`) maps are chosen as the selection
    shuffleArray(available);
    const selection = available.slice(0, amount);

    if (!selection.length) {
      target.innerHTML =
        `<div class="empty">
          <div class="empty-icon">
            <span class="icon icon-emoji"></span>
          </div>
        <p class="empty-title h5">Congratulations</p>
        <p class="empty-subtitle">You've successfully selected no maps, you muppet</p>
        </div>`;
      return;
    }

    target.innerHTML = selection.map((entry, idx) => {
      return `<div class="img-container">
                <img src="images/maps/${entry.image}" alt=${entry.name} class="img-responsive" aria-hidden="true"/>
                <div class="img-text-header">${idx + 1} | ${entry.name}</div>
              </div>`
    }).join('');
  }


  // We have a bunch of advanced settings for our power uses that want to
  // generate a custom map selection so we want to ensure that we update
  // our results when changes happen.
  Array.from(document.getElementsByTagName('input')).forEach(function listen(elem) {
    elem.addEventListener('change', render);
  });

  document.getElementById('again').addEventListener('click', render);
  document.forms[0].addEventListener('submit', render);

  return render();
})();
