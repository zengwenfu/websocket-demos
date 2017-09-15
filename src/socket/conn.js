const wsMap = process.wsMap;
const message = require('./message.js');
const wsRelaMap = process.wsRelaMap;

module.exports = function (wss) {
    wss.on('connection', function( ws ) {
        const id = ws._ultron.id;
        ws.on('message', function( data, flags ) {
            const dataStr = data;
            data = JSON.parse(data);
            /**
            * 初始连接，并且传入了需要关联的 id
            */
            if (data.type === '1' && data.relaId) {
                wsRelaMap[id] = data.relaId;
            } else if (data.type === '2') { // 发送消息到关联方
                const rela = wsMap[wsRelaMap[id]];
                if (rela) {
                    rela.send(dataStr);
                }
            }
        });
        ws.on('close', function() {
            console.log('stopping client');
            delete wsMap[id]
        });

        wsMap[id] = ws;
        ws.send(message.buildConnectMessage(id));
    });
}
