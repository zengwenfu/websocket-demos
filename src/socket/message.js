/**
   type: 
    1: 初始化消息，返回连接 id
*/

module.exports = {
    buildConnectMessage (id) {
        const result = {
            type: '1',
            id: id
        };
        return JSON.stringify(result)
    }
}
