import Meeting from "../models/meeting.js";

export const createMeeting = async (req, res) => {
  const user = req.user;
  try {
    const { title, date, time, duration, description, meetingCode } = req.body;
    const FoundMeeting = await Meeting.findOne({
      date: date,
      meetingCode: meetingCode,
    });
    if (FoundMeeting) {
      return res.status(500).json("meeting already created");
    }

    const newMeeting = new Meeting({
      time: time,
      title: title,
      date: date,
      description: description,
      meetingCode: meetingCode,
      duration: duration,
      ownerId: user._id,
    });
    await newMeeting.save();
    res.status(200).json("meeting Created succfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteMeeting = async (req, res) => {
  const user = req.user;
  try {
    const id = req.params.id;
    const FoundMeeting = await Meeting.findById(id);
    if (!FoundMeeting) {
      return res.status(404).json("Meeting not found !");
    }

    if (FoundMeeting.ownerId.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json("You don't have permission to delete this meeting");
    }
    await Meeting.findByIdAndDelete(id);
    res.status(200).json("Meeting deleted succfully");
  } catch (e) {
    console.log(e);
  }
};

export const getMeeting = async (req, res) => {
  const code = req.header("code");
  try {
    const meeting = await Meeting.findOne({ meetingCode: code });
    if (!meeting) {
      return res.status(404).json("Such Meeting not found !");
    }
    res.status(200).json(meeting);
  } catch (e) {
    console.log(e);
  }
};

export const userMeetings = async (req, res) => {
  try {
    const user = req.user;
    const meetings = await Meeting.find({ ownerId: user._id });
    res.status(200).json(meetings);
  } catch (e) {
    console.log(e);
  }
};

export const addParticipant = async (req, res) => {
  const user = req.user;
  try {
    const { code } = req.body;
    const meeting = await Meeting.findOne({ meetingCode: code });
    if (meeting.members.includes(user._id)) {
      return res.status(403).json("user aleready added");
    }
    meeting.members.push(user._id);
    user.meetings.push({
      title: meeting.title,
      description: meeting.description,
      meetingId: meeting.meetingCode,
    });
    await meeting.save();
    await user.save();
    res.status(200).json("user add succefully");
  } catch (e) {
    console.log(e);
  }
};
