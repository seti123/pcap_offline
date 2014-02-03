var pcap = require ('./pcap_offline');
var tcp_tracker = new pcap.TCP_tracker();
tcp_tracker.on('http response complete', function (session,http) {
	console.log (http.request.headers['Host'] + http.request.url);
	console.log (http.response.headers['Content-Length'] );
});
var session = pcap.readPcap ('test.pcap', function (packetBuffer) { 
	var packet = pcap.decode.packet(packetBuffer);
	if (packet.link && packet.link.ip && packet.link.ip.tcp) {
                    //console.log ('track packet');
                    tcp_tracker.track_packet(packet);
        }
});

session.readStream.on('end', function() { process.exit(0) });

