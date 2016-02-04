if (Meteor.isServer) {
	// This example is via `service-configuration` 
	ServiceConfiguration.configurations.update(
	  { "service": "spotify" },
	  {
	    $set: {
	      "clientId": "21f29d28850142fdbb74e13b73a90137",
	      "secret": "bb09e12fd7554498b5ae28b912a9cb26"
	    }
	  },
	  { upsert: true }
	);
}