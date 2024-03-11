export default function getStudentIdsSum(students) {
  return students.reduce((x, y) => x + y.id, 0);
}
