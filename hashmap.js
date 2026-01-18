import {LinkedList, Node } from "./linkedlist.js";

class Hashmap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.table = new Array(this.capacity)
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    } 

    set(key, value) {
        const index = this.hash(key);

        // バケット取得（LinkedList or undefined）
        let list = this.table[index];

        // バケットが空ならリストを作って格納
        if (!list) {
            list = new LinkedList();
            list.append(key, value);
            this.table[index] = list;       // ← これが必須
            this.checkLoadFactor();         // 新規追加なので呼ぶ
            return;
        }

        // 既存リストを走査して同一キーがあれば更新して終了
        let node = list.head;
        while (node) {                    
            if (node.key === key) {
            node.value = value;
            return;                       
            }
            node = node.next;              
        }

        // 同一キーがなければ新規追加
        list.append(key, value);        
    }


    get(key) {
        const index = this.hash(key);
        const list = this.table[index];

        if (!list) return null;

        let node = list.head;
        while (node) {
            if (node.key === key) return node.value;
            node = node.next;
        }

        return null;
    }


    has(key) {
        const index = this.hash(key);
        const list = this.table[index];

        if (!list) return false;

        let node = list.head;
        while (node) {
            if (node.key === key) return true;
            node = node.next;
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const list = this.table[index];

        // 要素がなければ終了
        if (!list) return false;

        let current = list.head;
        let prev = null;

        // ノードがある限り走査
        while (current) {
        if (current.key === key) {
            // 先頭を削除
            if (!prev) {
            list.head = current.next;
            } else {
            prev.next = current.next;
            }

            // 末尾を削除した場合は tail を更新
            if (current === list.tail) {
            list.tail = prev;
            }

            // 空になったらバケットごと消す（方針に応じて delete でもOK）
            if (!list.head) {
            this.table[index] = undefined;
            }

            return true;
        }

        prev = current;
        current = current.next;
        }

        return false;
    }


    // ハッシュテーブル内の全ての要素の数を返す。
    length() {
        let count = 0;
        for(let i =0; i < this.table.length; i++) {
            if(!this.table[i]) continue;
            count += this.table[i].getSize();
        }
        return count;
    }
    // テーブル内の要素を全て削除
    clear() {
        for(let i = 0; i < this.table.length; i++) {
            delete this.table[i];
        }
    }

    keys() {
        const arr = [];
        const map = this.table
        // 配列の要素それぞれを走査
        for(let i = 0; i < map.length; i++) {
            // 配列にリストがなければスキップ
            if(!map[i]) continue;
            let node = map[i].head;
            // 次のノードがある限り走査してkeys配列にキーを格納
            while(node.next) {
                arr.push(node.key);
                node = node.next;
            }
            // 最後の要素を追加する
            arr.push(node.key);
        }
        return arr;
    }

    values() {
        const arr = [];
        const map = this.table
        // 配列の要素それぞれを走査
        for(let i = 0; i < map.length; i++) {
            // 配列にリストがなければスキップ
            if(!map[i]) continue;
            let node = map[i].head;
            // 次のノードがある限り走査してkeys配列にキーを格納
            while(node.next) {
                arr.push(node.value);
                node = node.next;
            }
            // 最後の要素を追加する
            arr.push(node.value);
        }
        return arr;        
    }

    entries() {
        const arr = [];
        let pair = [];
        const list = this.table
        // 配列の要素それぞれを走査
        for(let i = 0; i < list.length; i++) {
            // 配列にリストがなければスキップ
            if(!list[i]) continue;
            let node = list[i].head;
            // 次のノードがある限り走査してkeys配列にキーを格納
            while(node) {
                pair = [node.key, node.value];
                arr.push(pair);
                node = node.next;
            }
        }
        return arr;        
    }

    checkLoadFactor() {
        // ノードの追加処理終了後、ロードファクターをチェックしてオーバーする場合、キャパシティを追加
        let count = 0;
        for(let i = 0; i < this.capacity; i++) {
            if(this.table[i]) {
                count++;
            }
        }
        const currentLoadFactor = count / this.capacity;
        if(currentLoadFactor >= this.loadFactor) {
            this.resize();
        }
    }

    resize() {
        const oldTable = this.table;
        const oldCapacity = this.capacity;

        this.capacity *= 2;
        this.table = new Array(this.capacity);

        // 旧テーブルの全ノードを再ハッシュ
        for (let i = 0; i < oldCapacity; i++) {
            const list = oldTable[i];
            if (!list) continue;

            let node = list.head;
            while (node) {
            this.set(node.key, node.value); // ← 新 capacity で再計算される
            node = node.next;
            }
        }
    }

}

let test = new Hashmap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('watch', 'golden')
test.set('koko', 'golden')
test.set('alpha', 'silver')
test.set('bs', 'silver')
test.set('it', 'silver')
test.set('test', 'silver')
test.set('aiaai', 'silver')

console.log(test)