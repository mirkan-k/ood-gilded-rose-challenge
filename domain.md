<!--  -->
### Requirements

- Items have SellIn vlaue which indicates how many days we have left to sell the Item
- Items also have Quality value which shows how valuable the Item is
- The Shop goes through a Daily Cycle and each day it lowers both values for every Item by default, but there are some expections...

- IF the sellIn value drops past 0, the Quality value degrades twice as fast
- IF the Item is a 'Conjured' item, then the Quality value degrades twice as fast
- Quality Value of ANY Item must not go below 0 (maybe add a baseline for each type of item?)
- Quality value is capped at 50 for all items except Legendary Items, for those their Baseline and Cap/limit is 80
- Legendary Items sellIn value is by default 0, indicating that they never drop or increase in value so no sellIn is required
- Quality value of 'Aged Brie' AND 'Backstage passes' Item increases instead of decreasing as the sellIn value drops
- IF 'Backstage passes' Item's sellIn value is <=10, Quality value increases 2x, IF sellIn value <=5, Quality value increases 3x

## Domain Model

use polymorphism and a .forEach prototype method to apply an update to every item type. Also each item class inherits Item class constructor.

### Items (abstract entities):

#### RARITY:

- COMMON (qualityLowerLimit = 0, qualityUpperLimit = 50):
  - '+5 Dexterity Vest', sellIn: 10--, Quality: 20--
  - 'Elixir of the Mongoose', sellIn: 5--, Qaulity 7--

- RARE (qualityLowerLimit = 0, qualityUpperLimit = 50):
  - 'Aged Brie', sellIn: 2--, Quality: 0++

- EXCLUSIVE (qualityLowerLimit = 0, qualityUpperLimit = 50):
  - 'Backstage passes', sellIn: 15--, Quality: 20++(IF sellIn <=10, Quality+=2, IF sellIn <=5, Quality+=3)

- LEGENDARY (qualityLowerLimit = 80, qualityUpperLimit = 80):
  - 'Sulfuras, Hand of Ragnaros', sellIn: 0--, Quality: 80

- CONJURED (qualityLowerLimit = 0, qualityUpperLimit = 50):
  - 'Conjured Mana Cake', sellIn: 3--, Quality: 6 -=2

### Item (Class):
- PROPERTIES:
  - name: String
  - sellIn: Integer
  - quality: Integer

### CommonItem (Class extends Item)
- PROPERTIES:
  - (inherited from Item)

- METHODS:
  - age(): decrease sellIn & quality by 1, IF sellIn is < 0 decrease quality by 2, IF quality < 0 then quality = 0. IF quality > 50 then quality = 50

### RareItem (Class extends Item)
- PROPERTIES:
  - (inherited from Item)

- METHODS:
  - age(): decrease sellIn & increase quality by 1, IF sellIn is < 0 increase quality by 2, IF quality < 0 then quality = 0. IF quality + 1 > 50 then quality = 50

### ExclusiveItem (Class extends Item)
- PROPERTIES:
  - (inherited from Item)

- METHODS:
  - age(): decrease sellIn & increase quality by 1, IF sellIn is < 0 then quality = 0, IF sellIn <= 5 increase quality by 3, IF sellIn <= 10 increase quality by 2, IF quality < 0 then quality = 0. IF quality + 1 > 50 then quality = 50

### LegendaryItem (Class extends Item)
- PROPERTIES:
  - (inherited from Item)

- METHODS:
  - age(): set quality = 80, sellIn = 0

### ConjuredItem (Class extends Item)
- PROPERTIES:
  - (inherited from Item)

- METHODS:
  - age(): decrease sellIn by 1 & quality by 2, IF sellIn is < 0 decrease quality by 4, IF quality < 0 then quality = 0. IF quality + 1 > 50 then quality = 50.

### Shop (Class):
- PROPERTIES:
  - items = [] of Item

- METHODS:
  - updateQuality(): return this.items after running this.items.forEach(item => item.age())
