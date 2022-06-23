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
