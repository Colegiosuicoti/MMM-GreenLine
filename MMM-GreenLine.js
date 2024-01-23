Module.register("MMM-GreenLine", {
	// Default module config.
	defaults: {
		elementId: "CALEXT_CONTAINER_current", // ID of the element you want to check
		checkInterval: 5000 // Check every 5 seconds (adjust as needed)
	},

	// Override start method.
	start () {
		var self = this;

		// Initial check
		this.checkElement();

		// Periodic check
		setInterval(function () {
			self.updateDom();
		}, this.config.checkInterval);
	},

	// Method to check the element's presence.
	checkElement () {
		var htmlElement = document.getElementById(this.config.elementId);

		if (htmlElement) {
			var displayProperty = window.getComputedStyle(htmlElement).getPropertyValue("display");

			if (displayProperty !== "none") {
				return true;
			}
		}

		return false;
	},

	// Method to display the green line.
	showGreenLine () {
		this.updateDom();
	},

	// Method to hide the green line.
	hideGreenLine () {
		var wrapper = this.getDom();
		wrapper.style.display = "none"; // Clear the content to hide the green line
		this.updateDom();
	},

	getDom () {
		var wrapper = document.createElement("div");
		wrapper.style.backgroundColor = "green";
		wrapper.textContent = "SALA DISPONÍVEL";
		wrapper.style.paddingTop = "22px";
		wrapper.style.fontSize = "72px";
		wrapper.style.fontWeight = "bold";
		wrapper.style.width = "100%";

		var subtext = document.createElement("p");
		subtext.style.fontSize = "36px";
		subtext.textContent = "Para utilizá-la, faça a reserva por meio do Google Agenda";

		wrapper.appendChild(subtext);


		var currentExists = this.checkElement();

		if (currentExists) {
			wrapper.style.display = "none";
		} else {
			wrapper.style.display = "block";
		}
		return wrapper;
	},

	// Override notification handler.
	notificationReceived (notification, payload, sender) {
		// Optionally handle other notifications
	}
});
