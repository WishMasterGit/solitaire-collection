
import { Actions} from '../../src/solitaireTypes';

import { DeckGenerators } from '../../src/solitaireTypes'
const deck = "1S0stock0;13S0stock0;12S0stock0;11S0stock0;10S0stock0;9S0stock0;8S0stock0;7S0stock0;6S0stock0;5S0stock0;4S0stock0;3S0stock0;2S0stock0;1C0stock0;13C0stock0;12C0stock0;11C0stock0;10C0stock0;9C0stock0;8C0stock0;7C0stock0;6C0stock0;5C0stock0;4C0stock0;3C0stock0;2C0stock0;1D0stock0;13D0stock0;12D0stock0;11D0stock0;10D0stock0;9D0stock0;8D0stock0;7D0stock0;6D0stock0;5D0stock0;4D0stock0;2D0stock0;3D0stock0;12H0stock0;13H0stock0;8H0stock0;9H0stock0;10H0stock0;11H0stock0;5H0stock0;2H0stock0;6H0stock0;7H0stock0;3H0stock0;4H0stock0;1H0stock0"
export const customDeck =  {type:DeckGenerators.PreBuilt, value:deck}
export const gameActions = [
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Location",
      "value": {
        "type": "foundation",
        "index": 0
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Location",
      "value": {
        "type": "tableau",
        "index": 3
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "C",
        "face": 0,
        "location": {
          "type": "stock",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "C",
        "face": 0,
        "location": {
          "type": "stock",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Location",
      "value": {
        "type": "tableau",
        "index": 0
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "S",
        "face": 0,
        "location": {
          "type": "stock",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "S",
        "face": 0,
        "location": {
          "type": "stock",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Location",
      "value": {
        "type": "tableau",
        "index": 4
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 6
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 5
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 2
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 3
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "H",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 4
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "D",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Location",
      "value": {
        "type": "foundation",
        "index": 0
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 1
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 1,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 2,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 3,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 4,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 5,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 6,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 7,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 8,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 9,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 10,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 11,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 12,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "foundation",
          "index": 0
        }
      }
    }
  ],
  [
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "C",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    },
    {
      "type": "Card",
      "value": {
        "rank": 13,
        "suit": "S",
        "face": 1,
        "location": {
          "type": "tableau",
          "index": 0
        }
      }
    }]
] as Actions[]
