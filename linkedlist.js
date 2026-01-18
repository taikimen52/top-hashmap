export class LinkedList {
    constructor() {
        this.head;
        this.tail;
    }

    append(key, value) {
        // 新しいノードを作成
        const node = new Node(key, value);

        // リストが空なら先頭に追加
        if(!this.head){
            this.head = node;
            this.tail = node;
        } 
        // リストにすでにノードがあれば最後に追加
        else {
            this.tail.next = node;
            this.tail = node;
        }
    }
    getSize() {
        // カウント
        let count = 0;
        let lastNode = this.head;
        // リストが空ならメッセージを返す
        if(!this.head){
            return count;
        }
        // リストが存在すればノードがある限り次のノードを最後のノードとしカウントを追加していく
        else {
            while(lastNode) {
                count++;
                lastNode = lastNode.next;
            }
        }
        return count;
    }

}

export class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}