//Implementing LRU Cache using Map in JavaScript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cacheMap = new Map();
  }

  get(key) {
    if (!this.cacheMap.has(key)) {
      return -1;
    }

    const value = this.cacheMap.get(key);
    this.cacheMap.delete(key);

    this.cacheMap.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cacheMap.has(key)) {
      this.cacheMap.delete(key);
    } else {
      if (this.cacheMap.size === this.capacity) {
        const leastRecentlyUsedKey = this.cacheMap.keys().next().value;
        this.cacheMap.delete(leastRecentlyUsedKey);
      }
    }
    this.cacheMap.set(key, value);
  }
}

// Example usage
// const lru = new LRUCache(2);
// lru.put(1, 1);
// lru.put(2, 2);
// console.log(lru.get(1));
// lru.put(3, 3);
// console.log(lru.get(2));
// lru.put(4, 4);
// console.log(lru.get(1));
// console.log(lru.get(3));
// console.log(lru.get(4));





//LRU Cache using Map and Doubly LinkedList
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCacheDLL {
  constructor(capacity) {
    this.capacity = capacity;
    this.cacheMap = new Map();
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _addNodeToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
  }

  get(key) {
    if (!this.cacheMap.has(key)) {
      return -1;
    }

    const cacheNode = this.cacheMap.get(key);
    const resultValue = cacheNode.value;
    this._removeNode(cacheNode);

    this._addNodeToHead(cacheNode);

    return resultValue;
  }

  put(key, value) {
    if (this.cacheMap.has(key)) {
      const existingNode = this.cacheMap.get(key);
      this._removeNode(existingNode);
      existingNode.value = value;
      this._addNodeToHead(existingNode);
    } else {
      if (this.cacheMap.size >= this.capacity) {
        const leastRecentlyUsedNode = this.tail.prev;

        this.cacheMap.delete(leastRecentlyUsedNode.key);
        this._removeNode(leastRecentlyUsedNode);
      }

      const newCacheNode = new Node(key, value);
      this._addNodeToHead(newCacheNode);
      this.cacheMap.set(key, newCacheNode);
    }
  }
}

// Example usage
const lru = new LRUCacheDLL(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1));
lru.put(3, 3);
console.log(lru.get(2));
lru.put(4, 4);
console.log(lru.get(1));
console.log(lru.get(3));
console.log(lru.get(4));
