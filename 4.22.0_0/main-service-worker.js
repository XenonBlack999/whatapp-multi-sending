try {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      openOnInstallPage();
    }

    setDefaultAccessoryValues();
    initializeFrequentMessagesToStorage();

    // if (details.reason == 'update') {
    //   chrome.tabs.create({
    //     url: "https://link.rocketsend.io/on-update-page",
    //     active: true,
    //   });
    // }

  });

  chrome.runtime.setUninstallURL("#");


  chrome.action.onClicked.addListener((tab) => {
    openExtensionIconClick();
  });

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.name === "validateLicense") {
      validateLicense(msg.params)
        .then((res) => {
          response({ success: true, message: "License key activated.", data: res });
        })
        .catch((err) => {
          response({ sucess: true, message: "An error occurred. Please contact customer service." });
        });
    }

    return true;
  });

  function openExtensionIconClick() {
    chrome.tabs.create({ url: "https://web.whatsapp.com?mode=r-popup" });
  }

  function openOnInstallPage() {
    chrome.tabs.create({ url: "#" });
  }

  let initializeFrequentMessagesToStorage = () => {
    const getQuickChatStoredData = (callback) => {
      chrome.storage.local.get(["whatsapp-rocket-tags-key"], function (result) {
        callback(result);
      });
    };

    let content = [];
    getQuickChatStoredData((result) => {
      if (Array.isArray(result["whatsapp-rocket-tags-key"])) {
        content = result["whatsapp-rocket-tags-key"];
      }
      if (content.length === 0) {
        content.push("Hi, how can I help?");
        content.push("Can I get back to you soon?");
        content.push("You are welcome.");
      }

      chrome.storage.local.set(
        { "whatsapp-rocket-tags-key": content },
        function () { }
      );
    });
  };

  let validateLicense = (params) => {
    return new Promise((resolve, reject) => {
      const url = "#";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const setDefaultAccessoryValues = () => {

    chrome.storage.local.get(["whatsapp-rocket-accessories-data"], function (result) {
      if (!result["whatsapp-rocket-accessories-data"]) {
        chrome.storage.local.set(
          { "whatsapp-rocket-accessories-data": { "highlight-unread": true } },
          function () { }
        );
      }

    });


  }
} catch (e) { }
