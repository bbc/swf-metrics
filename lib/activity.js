module.exports = (activityAtVersion) => {
  const [name, version] = activityAtVersion.split('@');

  return { name, version };
};
