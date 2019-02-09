import "react-native";
import React from "react";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("Camera Roll Gallery renders correctly", () => {
    jest.mock("CameraRoll", () => "CameraRoll");
});
