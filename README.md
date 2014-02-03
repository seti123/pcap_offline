Offline PCAP based on [mranny/node_pcap](https://github.com/mranney/node_pcap), [kunklejr/node-pcap-parser](https://github.com/kunklejr/node-pcap-parser), [wanderview/node-pcap-stream](https://github.com/wanderview/node-pcap-stream)

Major Changes: instead of openOffline use readPcap('file.pcap', function (packet) {});

- It's based on pcap-stream and pcap-parser to replace native libpcap bining. 
- Improvement: it detects IP packets more or less independet from link-layer. 
- Limitation: lost packet filter capabilities of native libpcap, pcap-ng not supported by pcap-stream (as far I know) 

An Example

    var pcap = require ('./pcap_offline'); // or with mpn, require ('pcap_offline')
    var tcp_tracker = new pcap.TCP_tracker();
    tcp_tracker.on('http response complete', function (session,http) {
    	console.log (http.request.headers['Host'] + http.request.url);
    	console.log (http.response.headers['Content-Length'] );
    });
    // here it gets different (!), don't use openOffline use readPcap
    var session = pcap.readPcap ('test.pcap', function (packetBuffer) { 
    	var packet = pcap.decode.packet(packetBuffer);
    	if (packet.link && packet.link.ip && packet.link.ip.tcp) {
                        tcp_tracker.track_packet(packet);
      }
    });

    session.readStream.on('end', function() { process.exit(0) });
