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
        // ハッシュ関数で格納するバケットを特定
        const bucket = this.hash(key);
        // 引数をオブジェクトにする
        const node = {
            key,
            value,
            next: null
        }
        // バケット内の最後のオブジェクトを取得
        let lastNode = this.table[bucket]

        // バケットが空ならオブジェクトを格納
        if(!lastNode){
            this.table[bucket] = node;

        }
        // バケットにすでにノードがある場合、連結リストの末尾に追加
        else {
            while(lastNode.next){
                // 同一キーなら上書き
                if(lastNode.key === node.key) {
                    lastNode = node;
                }
                lastNode = lastNode.next

            }
            lastNode.next = node;
        } 
        return this
    }
}

let sample = new Hashmap();
sample.set("iida", "taiki");
sample.set("iida", "aaaaaa");
console.log(sample.table[13])
