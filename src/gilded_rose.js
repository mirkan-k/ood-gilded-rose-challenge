class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class CommonItem extends Item {
  age() {
    this.sellIn--
    if (this.sellIn < 0) {
      this.quality -= 2
    } else {
      this.quality--
    }

    if (this.quality < 0) {
      this.quality = 0
    }

    if (this.quality > 50) {
      this.quality = 50
    }
  }
}

class RareItem extends Item {
  age() {
    this.sellIn--
    if (this.quality < 0) {
      this.quality = 0
    }

    if (this.sellIn < 0) {
      this.quality += 2
    } else {
      this.quality++
    }

    if (this.quality > 50) {
      this.quality = 50
    }
  }
}

class ExclusiveItem extends Item {
  age() {
    this.sellIn--
    if (this.quality < 0) {
      this.quality = 0
    }

    if (this.sellIn < 0) {
      this.quality = 0
    } else if (this.sellIn <= 5) {
      this.quality += 3
    } else if (this.sellIn <= 10) {
      this.quality += 2
    } else {
      this.quality++
    }

    if (this.quality > 50) {
      this.quality = 50
    }
  }
}

class LegendaryItem extends Item {
  age() {
    this.sellIn = 0
    this.quality = 80
  }
}

class ConjuredItem extends Item {
  age() {
    this.sellIn -= 1
    if (this.sellIn < 0) {
      this.quality -= 4
    } else {
      this.quality -= 2
    }

    if (this.quality < 0) {
      this.quality = 0
    }

    if (this.quality > 50) {
      this.quality = 50
    }
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => item.age())

    return this.items
  }

  // updateConjured(item) {
  //   item.sellIn -= 1
  //   if (item.sellIn < 0) {
  //     item.quality -= 4
  //   } else {
  //     item.quality -= 2
  //   }

  //   if (item.quality < 0) {
  //     item.quality = 0
  //   }

  //   if (item.quality > 50) {
  //     item.quality = 50
  //   }
  // }

  // updateCommon(item) {
  //   item.sellIn--
  //   if (item.sellIn < 0) {
  //     item.quality -= 2
  //   } else {
  //     item.quality--
  //   }

  //   if (item.quality < 0) {
  //     item.quality = 0
  //   }

  //   if (item.quality > 50) {
  //     item.quality = 50
  //   }
  // }

  // updateRare(item) {
  //   item.sellIn--
  //   if (item.quality < 0) {
  //     item.quality = 0
  //   }

  //   if (item.sellIn < 0) {
  //     item.quality += 2
  //   } else {
  //     item.quality++
  //   }

  //   if (item.quality > 50) {
  //     item.quality = 50
  //   }
  // }

  // updateExclusive(item) {
  //   item.sellIn--
  //   if (item.quality < 0) {
  //     item.quality = 0
  //   }

  //   if (item.sellIn < 0) {
  //     item.quality = 0
  //   } else if (item.sellIn <= 5) {
  //     item.quality += 3
  //   } else if (item.sellIn <= 10) {
  //     item.quality += 2
  //   } else {
  //     item.quality++
  //   }

  //   if (item.quality > 50) {
  //     item.quality = 50
  //   }
  // }

  // updateLegendary(item) {
  //   item.sellIn = 0
  //   item.quality = 80
  // }

  // updateQuality() {
  //   for (var i = 0; i < this.items.length; i++) {
  //     const currentItem = this.items[i]
      
  //     if (currentItem.name.includes('Conjured')) {
  //       this.updateConjured(currentItem)
  //     } else if (
  //       currentItem.name.includes('+5 Dexterity Vest') ||
  //       currentItem.name.includes('Elixir of the Mongoose')) {
  //       this.updateCommon(currentItem)
  //     } else if (currentItem.name.includes('Aged Brie')) {
  //       this.updateRare(currentItem)
  //     } else if (currentItem.name.includes('Backstage')) {
  //       this.updateExclusive(currentItem)
  //     } else if (currentItem.name.includes('Sulfuras')) {
  //       this.updateLegendary(currentItem)
  //     } else {
  //       currentItem.quality = 'TBC'
  //       currentItem.sellIn = 0
  //     }
  // }
  //   return this.items;
  // }
}

module.exports = {
  Item, 
  CommonItem, 
  RareItem, 
  ExclusiveItem, 
  LegendaryItem, 
  ConjuredItem,
  Shop
}
